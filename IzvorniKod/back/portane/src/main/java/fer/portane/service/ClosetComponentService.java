package fer.portane.service;

import fer.portane.model.lut.ClosetComponent;

import java.util.List;
import java.util.Optional;

public interface ClosetComponentService {
    List<ClosetComponent> findAll();
    Optional<ClosetComponent> findById(Long id);
}
