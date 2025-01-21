package fer.portane.facade;

import fer.portane.dto.GalleryDto;
import fer.portane.form.GalleryForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface GalleryFacade {
    Page<GalleryDto> getBySeller(Long sellerId, PageRequest pageRequest);
    GalleryDto findById(Long id);
    GalleryDto save(GalleryForm galleryForm);
    void deleteById(Long id);
}
