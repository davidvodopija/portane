package fer.portane.repository;

import fer.portane.model.ClosetCustomComponent;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClosetCustomComponentCustomRepository {
    @Query("SELECT ccc FROM ClosetCustomComponent ccc WHERE ccc.closet.id = :closetId")
    List<ClosetCustomComponent> findAllByClosetId(Long closetId);
}
