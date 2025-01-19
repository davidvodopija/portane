package fer.portane.service;

import fer.portane.form.AdSearchForm;
import fer.portane.model.Ad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface AdService {
    void deleteById(Long id);
    Ad save(Ad ad);
    Ad findById(Long id);
    List<Ad> findAllByGalleryId(Long galleryId);

    Page<Ad> search(PageRequest pageRequest, Specification<Ad> specification);
}
