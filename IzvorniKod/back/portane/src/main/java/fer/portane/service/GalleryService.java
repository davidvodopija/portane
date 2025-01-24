package fer.portane.service;

import fer.portane.model.Gallery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface GalleryService {
    Gallery save(Gallery gallery);
    Gallery findById(Long id);
    Page<Gallery> findAllBySellerId(Long sellerId, PageRequest pageRequest);
    void deleteById(Long id);
}
