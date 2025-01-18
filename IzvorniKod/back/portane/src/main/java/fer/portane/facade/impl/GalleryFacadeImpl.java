package fer.portane.facade.impl;

import fer.portane.dto.GalleryDto;
import fer.portane.facade.GalleryFacade;
import fer.portane.form.GalleryForm;
import fer.portane.mapper.GalleryGalleryDtoMapper;
import fer.portane.model.Gallery;
import fer.portane.model.Seller;
import fer.portane.repository.GalleryRepository;
import fer.portane.service.AuthService;
import fer.portane.service.GalleryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GalleryFacadeImpl implements GalleryFacade {
    @Autowired
    private GalleryService galleryService;
    @Autowired
    private AuthService authService;
    @Override
    public List<GalleryDto> getBySeller(Long sellerId) {
        return galleryService.findAllBySellerId(sellerId)
                .stream()
                .map(GalleryGalleryDtoMapper::toDto)
                .toList();
    }

    @Override
    public GalleryDto findById(Long id) {
        return GalleryGalleryDtoMapper.toDto(galleryService.findById(id));
    }

    @Override
    public GalleryDto save(GalleryForm galleryForm) {
        Gallery gallery;
        if (galleryForm.getId() != null) {
            gallery = galleryService.findById(galleryForm.getId());
            gallery.setName(galleryForm.getName());
        } else {
            gallery = new Gallery();
            gallery.setName(galleryForm.getName());
            Seller seller = authService.getAuthenticatedUser().getSeller();
            gallery.setSeller(seller);
        }

        return GalleryGalleryDtoMapper.toDto(galleryService.save(gallery));
    }

    @Override
    public void deleteById(Long id) {
        Gallery gallery = galleryService.findById(id);
        if (gallery.getAds().isEmpty()) {
            galleryService.deleteById(id);
        } else {
            throw new RuntimeException("Gallery with id " + id + " has ads.");
        }
    }
}
