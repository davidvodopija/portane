package fer.portane.facade;

import fer.portane.dto.AdDto;
import fer.portane.form.AdForm;
import fer.portane.form.AdSearchForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface AdFacade {
    void deleteById(Long id);
    AdDto save(AdForm adForm);
    AdDto findById(Long id);
    List<AdDto> findAllByGalleryId(Long galleryId);
    Page<AdDto> search(PageRequest pageRequest, AdSearchForm adSearchForm);
}
