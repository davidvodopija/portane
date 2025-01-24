package fer.portane.repository;

import fer.portane.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserCustomRepository {
    @Transactional
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> getUserByEmailWithTokens(String email);
}
