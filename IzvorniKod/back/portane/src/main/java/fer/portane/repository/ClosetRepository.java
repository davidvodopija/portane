package fer.portane.repository;

import fer.portane.model.Closet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClosetRepository extends JpaRepository<Closet, Long> {
    List<Closet> findAllByUserId(Long userId);
}
