package fer.portane.facade;

import fer.portane.dto.GalleryDto;
import fer.portane.form.GalleryForm;

import java.util.List;

public interface GalleryFacade {
    List<GalleryDto> getBySeller(Long sellerId);
    GalleryDto findById(Long id);
    GalleryDto save(GalleryForm galleryForm);
    void deleteById(Long id);
}
