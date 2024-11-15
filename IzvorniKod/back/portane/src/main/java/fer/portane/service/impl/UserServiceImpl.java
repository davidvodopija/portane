package fer.portane.service.impl;

import fer.portane.model.User;
import fer.portane.repository.UserRepository;
import fer.portane.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    @Override
    public Optional<User> getUserByEmailWithTokens(String email) {
        return userRepository.getUserByEmailWithTokens(email);
    }
}
