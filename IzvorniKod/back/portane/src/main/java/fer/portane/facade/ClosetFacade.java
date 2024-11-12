package fer.portane.facade;

import fer.portane.dto.ClosetDto;
import fer.portane.form.ClosetForm;

import java.util.List;

public interface ClosetFacade {
    ClosetDto create(ClosetForm closetForm);
    List<ClosetDto> findAllForAuthenticatedUser();
}
