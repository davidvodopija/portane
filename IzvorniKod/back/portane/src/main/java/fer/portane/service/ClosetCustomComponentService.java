package fer.portane.service;

import fer.portane.model.ClosetCustomComponent;

import java.util.List;

public interface ClosetCustomComponentService {
    List<ClosetCustomComponent> findForCloset(Long closetId);
    ClosetCustomComponent save(Long id, String title);
    void delete(Long id);
    ClosetCustomComponent findById(Long id);
}
