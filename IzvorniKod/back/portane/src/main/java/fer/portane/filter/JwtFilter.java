package fer.portane.filter;

import fer.portane.auth.Jwt;
import fer.portane.exception.NotFound;
import fer.portane.mapper.UserTokenTokenDtoMapper;
import fer.portane.model.BaseEntity;
import fer.portane.model.User;
import fer.portane.model.UserToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private Jwt jwt;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String uri = request.getRequestURI();

        /*if (uri.equals("/api/auth/login") || uri.equals("/api/users/create") || uri.startsWith("/h2-console") || uri.startsWith("/api/docs") || uri.startsWith("/api/swagger-ui")) {
            filterChain.doFilter(request, response);
            return;
        }*/

        String token = null;

        if(request.getCookies() != null){
            for(Cookie cookie: request.getCookies()){
                if(cookie.getName().equals("accessToken")){
                    token = cookie.getValue();
                }
            }
        }

        // is token valid
        if (token == null || !jwt.isValid(token, request.getRequestURI())) {
            filterChain.doFilter(request, response);
            return;
        }

        String email = jwt.getEmail(token);

        // email is found and not authenticated, let's try to authenticate
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                // get user from the database
                User user = (User) userDetailsService.loadUserByUsername(email);

                if (!user.isEnabled()) {
                    throw new UsernameNotFoundException("Please confirm your email.");
                }

                UserToken activeTokens = user.getTokens().stream()
                        .filter(BaseEntity::isActive)
                        .findFirst()
                        .orElseThrow(() -> new NotFound("Token not found."));

                // check is currently active token the same as the provided token
                if (!activeTokens.getAccessToken().equals(token) && !activeTokens.getRefreshToken().equals(token)) {
                    throw new NotFound("Token not found.");
                }

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

                // setting details
                usernamePasswordAuthenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // set authentication
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

            } catch (Exception e) {
                SecurityContextHolder.clearContext();
            }
        }

        // continue with the next filter
        filterChain.doFilter(request, response);
    }
}
