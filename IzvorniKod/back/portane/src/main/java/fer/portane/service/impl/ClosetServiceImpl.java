package fer.portane.service.impl;

import fer.portane.model.Closet;
import fer.portane.repository.ClosetRepository;
import fer.portane.service.ClosetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class ClosetServiceImpl implements ClosetService {
    @Autowired
    private ClosetRepository closetRepository;
    @Override
    public Closet save(Closet closet) {
        return closetRepository.save(closet);
    }

    @Override
    public void deleteById(Long id) {
        Closet closet = findById(id);
        if (closet.getComponents().stream().map(component -> component.getArticles().size()).anyMatch(size -> size > 0)) {
            throw new RuntimeException("Cannot delete closet with articles");
        }
        closetRepository.deleteById(id);
    }

    @Override
    public Closet findById(Long id) {
        return closetRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Closet> findAllByUserId(Long userId, PageRequest pageRequest) {
        return closetRepository.findAllByUserId(userId, pageRequest);
    }
}
