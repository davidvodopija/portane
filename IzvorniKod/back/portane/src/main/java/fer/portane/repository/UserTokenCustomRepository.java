package fer.portane.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserTokenCustomRepository {
    @Modifying
    @Transactional
    @Query("delete from UserToken ut where ut.user.id = :id")
    void deleteAllByUserId(Long id);
}
