package fer.portane.service;

import fer.portane.model.User;
import fer.portane.model.UserToken;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface UserService {
    User save(User user);
    Optional<User> getUserByEmail(String email);

    Optional<User> getUserByEmailWithTokens(String email);
}
