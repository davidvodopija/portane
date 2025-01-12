package fer.portane.repository;

import fer.portane.model.ClosetCustomComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClosetCustomComponentRepository extends JpaRepository<ClosetCustomComponent, Long> /*, ClosetCustomComponentCustomRepository*/ {
    List<ClosetCustomComponent> findAllByClosetId(Long closetId);
}
