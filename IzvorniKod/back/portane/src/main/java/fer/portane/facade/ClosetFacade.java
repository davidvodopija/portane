package fer.portane.facade;

import fer.portane.dto.ClosetDto;
import fer.portane.form.ClosetForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface ClosetFacade {
    ClosetDto save(ClosetForm closetForm);
    ClosetDto create(ClosetForm closetForm);
    Page<ClosetDto> findAllForAuthenticatedUser(PageRequest pageRequest);

    void delete(Long id);
}
