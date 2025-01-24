package fer.portane.service.impl;

import fer.portane.model.Gallery;
import fer.portane.repository.GalleryRepository;
import fer.portane.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class GalleryServiceImpl implements GalleryService {
    @Autowired
    private GalleryRepository galleryRepository;

    @Override
    public Gallery save(Gallery gallery) {
        return galleryRepository.save(gallery);
    }

    @Override
    public Gallery findById(Long id) {
        return galleryRepository.findById(id).orElseThrow(() -> new RuntimeException("Gallery with id " + id + " not found."));
    }

    @Override
    public Page<Gallery> findAllBySellerId(Long sellerId, PageRequest pageRequest) {
        return galleryRepository.findAllBySellerId(sellerId, pageRequest);
    }

    @Override
    public void deleteById(Long id) {
        galleryRepository.deleteById(id);
    }
}
