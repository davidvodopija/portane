package fer.portane.service.impl;

import fer.portane.model.Gallery;
import fer.portane.repository.GalleryRepository;
import fer.portane.service.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public List<Gallery> findAllBySellerId(Long sellerId) {
        return galleryRepository.findAllBySellerId(sellerId);
    }

    @Override
    public void deleteById(Long id) {
        galleryRepository.deleteById(id);
    }
}
