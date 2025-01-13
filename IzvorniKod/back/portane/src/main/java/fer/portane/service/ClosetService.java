package fer.portane.service;

import fer.portane.model.Closet;

import java.util.List;

public interface ClosetService {
    Closet save(Closet closet);
    void deleteById(Long id);
    Closet findById(Long id);
    List<Closet> findAllByUserId(Long userId);
}
