package fer.portane.facade;

import fer.portane.model.User;

public interface AuthFacade {
    User getAuthenticatedUser();
    void logout();
}
