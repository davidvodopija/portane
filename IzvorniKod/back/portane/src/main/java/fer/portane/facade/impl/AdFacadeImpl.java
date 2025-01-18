package fer.portane.facade.impl;

import fer.portane.dto.AdDto;
import fer.portane.facade.AdFacade;
import fer.portane.facade.ArticleFacade;
import fer.portane.form.AdForm;
import fer.portane.mapper.AdAdDtoMapper;
import fer.portane.model.Ad;
import fer.portane.model.Article;
import fer.portane.service.AdService;
import fer.portane.service.ArticleService;
import fer.portane.service.GalleryService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AdFacadeImpl implements AdFacade {
    @Autowired
    private AdService adService;

    @Autowired
    private AdAdDtoMapper adDtoMapper;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private GalleryService galleryService;

    @Autowired
    private ArticleFacade articleFacade;

    @Override
    public void deleteById(Long id) {
        adService.deleteById(id);
    }

    @Override
    @Transactional
    public AdDto save(AdForm adForm) {
        Ad ad;
        if (adForm.getId() != null) {
            ad = adService.findById(adForm.getId());
        } else {
            ad = new Ad();
        }

        Article article = articleService.findById(articleFacade.save(adForm.getArticle()).getId());
        ad.setArticle(article);
        ad.setPrice(adForm.getPrice());
        ad.setGallery(galleryService.findById(adForm.getGalleryId()));

        return adDtoMapper.toDto(adService.save(ad));
    }

    @Override
    public AdDto findById(Long id) {
        return adDtoMapper.toDto(adService.findById(id));
    }

    @Override
    public List<AdDto> findAllByGalleryId(Long galleryId) {
        return adService.findAllByGalleryId(galleryId)
                .stream()
                .map(adDtoMapper::toDto)
                .toList();
    }
}
