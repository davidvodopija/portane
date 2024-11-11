package fer.portane.facade.impl;

import fer.portane.facade.AuthFacade;
import fer.portane.model.User;
import fer.portane.service.AuthService;
import fer.portane.service.UserService;
import fer.portane.service.UserTokenService;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class AuthFacadeImpl implements AuthFacade {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserTokenService userTokenService;

    @Override
    public User getAuthenticatedUser() {
        Authentication authorization = authService.getAuthentication();
        if (authorization == null) {
            return null;
        }

        UserDetails userDetails = (UserDetails) authorization.getPrincipal();

        return userService.getUserByEmail(userDetails.getUsername()).orElse(null);
    }

    @Override
    public void logout() {
        User loggedInUser = getAuthenticatedUser();
        if (loggedInUser == null) {
            return;
        }
        userTokenService.deleteAllFromUser(loggedInUser.getId());
    }
}
