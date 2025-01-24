package fer.portane.facade.impl;

import fer.portane.dto.AdDto;
import fer.portane.facade.AdFacade;
import fer.portane.facade.ArticleFacade;
import fer.portane.form.AdForm;
import fer.portane.form.AdSearchForm;
import fer.portane.mapper.AdAdDtoMapper;
import fer.portane.model.Ad;
import fer.portane.model.Article;
import fer.portane.service.AdService;
import fer.portane.service.ArticleService;
import fer.portane.service.GalleryService;
import fer.portane.specification.AdSpecification;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
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

    @Override
    public Page<AdDto> search(PageRequest pageRequest, AdSearchForm adSearchForm) {
        Specification<Ad> specification = Specification.where(null);

        if (adSearchForm.getArticleSearchForm() != null) {

            if (adSearchForm.getArticleSearchForm().getLabel() != null) {
                specification = specification.and(AdSpecification.
                        labelLikeCaseInsensitive(
                                adSearchForm
                                        .getArticleSearchForm()
                                        .getLabel())
                );
            }

            if (adSearchForm.getArticleSearchForm().getCategoryIds() != null) {
                specification = specification.and(AdSpecification.
                        hasCategories(
                                adSearchForm
                                        .getArticleSearchForm()
                                        .getCategoryIds())
                );
            }

            if (adSearchForm.getArticleSearchForm().getStyleIds() != null) {
                specification = specification.and(AdSpecification.
                        hasStyles(
                                adSearchForm
                                        .getArticleSearchForm()
                                        .getStyleIds())
                );
            }

            if (adSearchForm.getArticleSearchForm().getPrimaryColorIds() != null) {
                specification = specification.and(AdSpecification.
                        hasPrimaryColors(
                                adSearchForm
                                        .getArticleSearchForm()
                                        .getPrimaryColorIds())
                );
            }

            if (adSearchForm.getArticleSearchForm().getSecondaryColorIds() != null) {
                specification = specification.and(AdSpecification.
                        hasSecondaryColors(
                                adSearchForm
                                        .getArticleSearchForm()
                                        .getSecondaryColorIds())
                );
            }

            if (adSearchForm.getArticleSearchForm().getConditionIds() != null) {
                specification = specification.and(AdSpecification.
                        hasConditions(
                                adSearchForm
                                        .getArticleSearchForm()
                                        .getConditionIds())
                );
            }

            if (adSearchForm.getArticleSearchForm().getSeasonIds() != null) {
                specification = specification.and(AdSpecification.
                        hasSeasons(
                                adSearchForm
                                        .getArticleSearchForm()
                                        .getSeasonIds())
                );
            }

            if (adSearchForm.getArticleSearchForm().getFootwearTypeIds() != null) {
                specification = specification.and(AdSpecification.
                        hasFootwearTypes(
                                adSearchForm
                                        .getArticleSearchForm()
                                        .getFootwearTypeIds())
                );
            }
        }

        if (adSearchForm.getMinPrice() != null && adSearchForm.getMaxPrice() != null) {
            specification = specification.and(AdSpecification.
                    hasPriceRange(
                            adSearchForm.getMinPrice(),
                            adSearchForm.getMaxPrice())
            );
        }

        if (adSearchForm.getSellerId() != null) {
            specification = specification.and(AdSpecification.
                    fromSeller(
                            adSearchForm
                                    .getSellerId())
            );
        }

        if (adSearchForm.getGalleryId() != null) {
            specification = specification.and(AdSpecification.
                    fromGallery(
                            adSearchForm
                                    .getGalleryId())
            );
        }

        return adService.search(pageRequest, specification)
                .map(adDtoMapper::toDto);
    }
}
