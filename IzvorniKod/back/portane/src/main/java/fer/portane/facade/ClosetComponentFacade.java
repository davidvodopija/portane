package fer.portane.facade;

import fer.portane.dto.ClosetComponentDto;
import fer.portane.model.ClosetComponent;

import java.util.List;

public interface ClosetComponentFacade {
    List<ClosetComponentDto> findAll();
}
