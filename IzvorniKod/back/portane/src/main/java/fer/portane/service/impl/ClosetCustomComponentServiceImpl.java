package fer.portane.service.impl;

import fer.portane.model.ClosetCustomComponent;
import fer.portane.repository.ClosetCustomComponentRepository;
import fer.portane.service.ClosetCustomComponentService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ClosetCustomComponentServiceImpl implements ClosetCustomComponentService {
    @Autowired
    private ClosetCustomComponentRepository closetCustomComponentRepository;
    @Override
    public List<ClosetCustomComponent> findForCloset(Long closetId) {
        return closetCustomComponentRepository.findAllByClosetId(closetId);
    }

    @Override
    public ClosetCustomComponent save(ClosetCustomComponent closetCustomComponent) {
        return closetCustomComponentRepository.save(closetCustomComponent);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!closetCustomComponentRepository.existsById(id)) {
            throw new RuntimeException("Closet custom component with id = " + id + " not found");
        }

        ClosetCustomComponent closetCustomComponent = closetCustomComponentRepository.findById(id).get();

        if (!closetCustomComponent.getArticles().isEmpty()) {
            throw new RuntimeException("Cannot delete! Closet custom component with id = " + id + " has articles");
        }

        closetCustomComponent.getCloset().getComponents().remove(closetCustomComponent);
        closetCustomComponentRepository.delete(closetCustomComponent);
    }

    @Override
    public ClosetCustomComponent findById(Long id) {
        return closetCustomComponentRepository.findById(id).orElseThrow(() -> new RuntimeException("Closet custom component with id = " + id + " not found"));
    }
}
