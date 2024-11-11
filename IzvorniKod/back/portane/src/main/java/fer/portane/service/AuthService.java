package fer.portane.service;

import fer.portane.model.User;
import org.springframework.security.core.Authentication;

public interface AuthService {
    User getAuthenticatedUser();
    Authentication getAuthentication();
}
