package fer.portane.service;

import fer.portane.model.Gallery;

import java.util.List;

public interface GalleryService {
    Gallery save(Gallery gallery);
    Gallery findById(Long id);
    List<Gallery> findAllBySellerId(Long sellerId);
    void deleteById(Long id);
}
