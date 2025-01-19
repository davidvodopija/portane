package fer.portane.service;

import fer.portane.model.lut.LutBase;
import fer.portane.repository.LutRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Transactional
public abstract class LutService<T extends LutBase> {
    @Autowired
    private LutRepository<T> lutRepository;

    public T findById(Long id) {
        return lutRepository.findById(id).orElse(null);
    }

    public T findByName(String name) {
        return lutRepository.findByName(name);
    }

    public List<T> findAll() {
        return lutRepository.findAll();
    }
}
