package fer.portane.config;

import fer.portane.filter.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Autowired
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizationManagerRequestMatcherRegistry -> {
                    authorizationManagerRequestMatcherRegistry
                            .requestMatchers(
                                    "/api/auth/login",
                                    "/api/users/create",
                                    "/h2-console/**",
                                    "/api/docs",
                                    "/v3/api-docs/**",
                                    "/api/swagger-ui/**",
                                    "/api/swagger-ui.html",
                                    "/api/lut/**",
                                    "/api/sellers/create",
                                    "/api/articles/search",
                                    "/api/ads/search",
                                    "/api/storage/upload",
                                    "/api/articles/find/**",
                                    "/api/ads/find/**",
                                    "/api/weather/**",
                                    "/oauth2/**",
                                    "/api/users/oauth2/**",
                                    "/api/sellers/oauth2/**",
                                    "/api/oauth2/**"
                            )
                            .permitAll()
                            .anyRequest()
                            .authenticated();
                })
                .sessionManagement(securitySessionManagementConfigurer -> {
                    securitySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
                })
                .headers(headers -> {
                    // Set the Content-Security-Policy header (no longer using frameOptions())
                    headers.addHeaderWriter((request, response) -> {
                        response.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
                    });
                })
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(FormLoginConfigurer::disable);
        return httpSecurity.build();
    }
}
