package fer.portane.facade;

import fer.portane.dto.ClosetComponentDto;

import java.util.List;

public interface ClosetComponentFacade {
    List<ClosetComponentDto> findAll();
}
