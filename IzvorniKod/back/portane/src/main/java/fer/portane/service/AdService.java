package fer.portane.service;

import fer.portane.model.Ad;

import java.util.List;

public interface AdService {
    void deleteById(Long id);
    Ad save(Ad ad);
    Ad findById(Long id);
    List<Ad> findAllByGalleryId(Long galleryId);
}
