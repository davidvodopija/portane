package fer.portane.facade;

import fer.portane.dto.AdDto;
import fer.portane.form.AdForm;

import java.util.List;

public interface AdFacade {
    void deleteById(Long id);
    AdDto save(AdForm adForm);
    AdDto findById(Long id);
    List<AdDto> findAllByGalleryId(Long galleryId);
}
