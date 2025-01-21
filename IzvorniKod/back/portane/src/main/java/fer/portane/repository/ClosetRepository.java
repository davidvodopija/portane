package fer.portane.repository;

import fer.portane.model.Closet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClosetRepository extends JpaRepository<Closet, Long> {
    Page<Closet> findAllByUserId(Long userId, PageRequest pageRequest);
    Optional<Closet> findFirstByIdOrderByCreatedAt(Long closetId);
}
