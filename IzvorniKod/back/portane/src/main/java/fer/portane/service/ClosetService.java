package fer.portane.service;

import fer.portane.model.Closet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.Optional;

public interface ClosetService {
    Closet save(Closet closet);
    void deleteById(Long id);
    Closet findById(Long id);
    Page<Closet> findAllByUserId(Long userId, PageRequest pageRequest);
    Optional<Closet> findFirstByUserId(Long userId);
}
