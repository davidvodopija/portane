package fer.portane.service.impl;

import fer.portane.model.ClosetCustomComponent;
import fer.portane.repository.ClosetCustomComponentRepository;
import fer.portane.service.ClosetCustomComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClosetCustomComponentServiceImpl implements ClosetCustomComponentService {
    @Autowired
    private ClosetCustomComponentRepository closetCustomComponentRepository;
    @Override
    public List<ClosetCustomComponent> findForCloset(Long closetId) {
        return closetCustomComponentRepository.findAllByClosetId(closetId);
    }

    @Override
    public ClosetCustomComponent save(Long id, String title) {
        ClosetCustomComponent closetCustomComponent = closetCustomComponentRepository.findById(id).get();
        closetCustomComponent.setTitle(title);
        return closetCustomComponentRepository.save(closetCustomComponent);
    }

    @Override
    public void delete(Long id) {
        if (!closetCustomComponentRepository.existsById(id)) {
            throw new RuntimeException("Closet custom component with id = " + id + " not found");
        }

        if (!closetCustomComponentRepository.findById(id).get().getArticles().isEmpty()) {
            throw new RuntimeException("Cannot delete! Closet custom component with id = " + id + " has articles");
        }

        closetCustomComponentRepository.deleteById(id);
    }
}
