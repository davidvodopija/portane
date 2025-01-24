package fer.portane.service.impl;

import fer.portane.model.User;
import fer.portane.service.AuthService;
import fer.portane.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserService userService;

    @Override
    public User getAuthenticatedUser() {
        Authentication authorization = getAuthentication();
        if (authorization.getPrincipal() == "anonymousUser") {
            return null;
        }

        UserDetails userDetails = (UserDetails) authorization.getPrincipal();

        return userService.getUserByEmail(userDetails.getUsername()).orElse(null);
    }

    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
