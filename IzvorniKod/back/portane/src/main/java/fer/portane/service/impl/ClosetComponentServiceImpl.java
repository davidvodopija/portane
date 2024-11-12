package fer.portane.service.impl;

import fer.portane.model.ClosetComponent;
import fer.portane.repository.ClosetComponentRepository;
import fer.portane.service.ClosetComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClosetComponentServiceImpl implements ClosetComponentService {
    @Autowired
    private ClosetComponentRepository closetComponentRepository;
    @Override
    public List<ClosetComponent> findAll() {
        return closetComponentRepository.findAll();
    }

    @Override
    public Optional<ClosetComponent> findById(Long id) {
        return closetComponentRepository.findById(id);
    }
}
