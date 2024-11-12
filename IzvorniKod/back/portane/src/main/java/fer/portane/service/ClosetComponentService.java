package fer.portane.service;

import fer.portane.model.ClosetComponent;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface ClosetComponentService {
    List<ClosetComponent> findAll();
    Optional<ClosetComponent> findById(Long id);
}
