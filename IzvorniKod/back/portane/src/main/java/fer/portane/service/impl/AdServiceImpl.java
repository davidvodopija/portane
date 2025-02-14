package fer.portane.service.impl;

import fer.portane.form.AdSearchForm;
import fer.portane.model.Ad;
import fer.portane.repository.AdRepository;
import fer.portane.service.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdServiceImpl implements AdService {
    @Autowired
    private AdRepository adRepository;
    @Override
    public void deleteById(Long id) {
        adRepository.deleteById(id);
    }

    @Override
    public Ad save(Ad ad) {
        return adRepository.save(ad);
    }

    @Override
    public Ad findById(Long id) {
        return adRepository.findById(id).orElseThrow(() -> new RuntimeException("Ad with id " + id + " not found."));
    }

    @Override
    public List<Ad> findAllByGalleryId(Long galleryId) {
        return adRepository.findAllByGalleryId(galleryId);
    }

    @Override
    public Page<Ad> search(PageRequest pageRequest, Specification<Ad> specification) {
        return adRepository.findAll(specification, pageRequest);
    }
}
