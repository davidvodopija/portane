package fer.portane.facade;

import fer.portane.dto.ClosetCustomComponentDto;
import fer.portane.form.ClosetCustomComponentForm;
import fer.portane.model.ClosetCustomComponent;

import java.util.List;

public interface ClosetCustomComponentFacade {
    List<ClosetCustomComponentDto> findForCloset(Long closetId);
    ClosetCustomComponentDto save(Long id, String title);
    void delete(Long id);
    ClosetCustomComponentDto add(Long closetId, ClosetCustomComponentForm form);
}
