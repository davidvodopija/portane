package fer.portane.facade.impl;

import fer.portane.facade.AuthFacade;
import fer.portane.model.User;
import fer.portane.service.AuthService;
import fer.portane.service.UserService;
import fer.portane.service.UserTokenService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void logout() {
        User loggedInUser = authService.getAuthenticatedUser();
        if (loggedInUser == null) {
            return;
        }
        userTokenService.deleteAllFromUser(loggedInUser.getId());
    }
}
