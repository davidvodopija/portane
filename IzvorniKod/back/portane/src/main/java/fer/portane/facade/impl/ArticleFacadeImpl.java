package fer.portane.facade.impl;

import fer.portane.dto.ArticleDto;
import fer.portane.facade.ArticleFacade;
import fer.portane.form.ArticleForm;
import fer.portane.form.ArticleSearchForm;
import fer.portane.form.OutfitForm;
import fer.portane.mapper.ArticleArticleDtoMapper;
import fer.portane.model.Ad;
import fer.portane.model.Article;
import fer.portane.model.ClosetCustomComponent;
import fer.portane.model.lut.Category;
import fer.portane.model.lut.Style;
import fer.portane.service.*;
import fer.portane.specification.ArticleSpecification;
import fer.portane.specification.ArticleSpecification;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Component
@Slf4j
public class ArticleFacadeImpl implements ArticleFacade {
    @Autowired
    private ArticleService articleService;
    @Autowired
    private ArticleArticleDtoMapper articleDtoMapper;
    @Autowired
    private ConditionService conditionService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private FootwearTypeService footwearTypeService;
    @Autowired
    private ColorService colorService;
    @Autowired
    private StyleService styleService;
    @Autowired
    private SeasonService seasonService;
    @Autowired
    private ClosetCustomComponentService closetCustomComponentService;
    @Autowired
    private AuthService authService;
    @Autowired
    private ClosetService closetService;

    @Override
    @Transactional
    public ArticleDto save(ArticleForm form) {
        Article article;
        if (form.getId() != null) {
            article = articleService.findById(form.getId());
            if (article == null) {
                throw new RuntimeException("Article with id = " + form.getId() + " not found");
            }
        } else {
            article = new Article();
        }

        article.setLabel(form.getLabel());
        article.setPicture(form.getPicture());
        article.setPublic(form.isPublic());


        if (form.getClosetCustomComponentId() != null) {
            ClosetCustomComponent closetCustomComponent = closetCustomComponentService.findById(form.getClosetCustomComponentId());
            closetCustomComponent.getArticles().add(article);
            article.setClosetCustomComponent(closetCustomComponentService.findById(form.getClosetCustomComponentId()));
        }

        article.setCondition(conditionService.findById(form.getConditionId()));
        article.setCategory(categoryService.findById(form.getCategoryId()));
        if (form.getFootwearTypeId() != null) {
            article.setFootwearType(footwearTypeService.findById(form.getFootwearTypeId()));
        }
        article.setPrimaryColor(colorService.findById(form.getPrimaryColorId()));
        article.setSecondaryColor(colorService.findById(form.getSecondaryColorId()));

        article.setSeason(seasonService.findById(form.getSeasonId()));

        List<Style> toRemove = article.getStyles().stream().filter(style -> !form.getStyleIds().contains(style.getId())).toList();
        toRemove.forEach(style -> article.getStyles().remove(style));

        List<Style> toAdd = form.getStyleIds().stream().filter(styleId -> article.getStyles().stream().noneMatch(style -> style.getId().equals(styleId))).map(styleService::findById).toList();
        toAdd.forEach(style -> article.getStyles().add(style));

        return articleDtoMapper.toDto(articleService.save(article));
    }

    @Override
    public void deleteById(Long id) {
        Article article = articleService.findById(id);

        if (article == null) {
        }

        if (!Objects.equals(article.getClosetCustomComponent().getCloset().getUser().getId(), authService.getAuthenticatedUser().getId())){
            throw new RuntimeException("You are not allowed to delete this article");
        }

        articleService.deleteById(id);
    }

    @Override
    public ArticleDto findById(Long id) {
        return articleDtoMapper.toDto(articleService.findById(id));
    }

    @Override
    public List<ArticleDto> findAllByClosetId(Long closetId) {
        return articleService.findAllByClosetId(closetId)
                .stream()
                .map(articleDtoMapper::toDto).toList();
    }

    @Override
    public Page<ArticleDto> search(PageRequest pageRequest, ArticleSearchForm articleSearchForm) {
        Specification<Article> specification = Specification.where(null);
        if (articleSearchForm.getLabel() != null) {
            specification = specification.and(ArticleSpecification.
                    labelLikeCaseInsensitive(
                            articleSearchForm
                                    .getLabel())
            );
        }

        if (articleSearchForm.getCategoryIds() != null) {
            specification = specification.and(ArticleSpecification.
                    hasCategories(
                            articleSearchForm
                                    .getCategoryIds())
            );
        }

        if (articleSearchForm.getStyleIds() != null) {
            specification = specification.and(ArticleSpecification.
                    hasStyles(
                            articleSearchForm
                                    .getStyleIds())
            );
        }

        if (articleSearchForm.getPrimaryColorIds() != null) {
            specification = specification.and(ArticleSpecification.
                    hasPrimaryColors(
                            articleSearchForm
                                    .getPrimaryColorIds())
            );
        }

        if (articleSearchForm.getSecondaryColorIds() != null) {
            specification = specification.and(ArticleSpecification.
                    hasSecondaryColors(
                            articleSearchForm
                                    .getSecondaryColorIds())
            );
        }

        if (articleSearchForm.getConditionIds() != null) {
            specification = specification.and(ArticleSpecification.
                    hasConditions(
                            articleSearchForm
                                    .getConditionIds())
            );
        }

        if (articleSearchForm.getSeasonIds() != null) {
            specification = specification.and(ArticleSpecification.
                    hasSeasons(
                            articleSearchForm
                                    .getSeasonIds())
            );
        }

        if (articleSearchForm.getFootwearTypeIds() != null) {
            specification = specification.and(ArticleSpecification.
                    hasFootwearTypes(
                            articleSearchForm
                                    .getFootwearTypeIds())
            );
        }

        if (articleSearchForm.getUserId() != null) {
            specification = specification.and(ArticleSpecification.
                    fromUser(
                            articleSearchForm
                                    .getUserId())
            );
        }

        if (articleSearchForm.getClosetId() != null) {
            specification = specification.and(ArticleSpecification.
                    fromCloset(
                            articleSearchForm
                                    .getClosetId())
            );
        }

        if (articleSearchForm.isPublic()) {
            specification = specification.and(ArticleSpecification.isPublic());
        }

        if (articleSearchForm.getClosetComponentIds() != null) {
            specification = specification.and(ArticleSpecification.
                    inClosetComponent(
                            articleSearchForm
                                    .getClosetComponentIds())
            );
        }


        return articleService.search(pageRequest, specification).map(articleDtoMapper::toDto);
    }

    @Override
    public List<ArticleDto> generateOutfit(OutfitForm outfitForm) {
        List<Long> categories = outfitForm.getCategoryIds();

        Long userId = authService.getAuthenticatedUser().getId();

        double matchFactor = (Math.random() % 50) / 100.0 + 0.5;
        int articleMathCount = (int) (categories.size() * matchFactor);
        List<Integer> bitmask = new ArrayList<>();
        for (int i = 0; i < articleMathCount; i++) {
            bitmask.add(1);
        }
        for (int i = 0; i < categories.size() - articleMathCount; i++) {
            bitmask.add(0);
        }
        Collections.shuffle(bitmask);

        List<Article> outfit = new ArrayList<>();
        for (int i = 0; i < categories.size(); i++) {
            Specification<Article> specification;
            if (bitmask.get(i) == 1) {
                specification = Specification.where(ArticleSpecification.fromUser(userId))
                        .and(ArticleSpecification.hasCategories(List.of(categories.get(i))))
                        .and(ArticleSpecification.hasStyles(Collections.singletonList(outfitForm.getStyleId())))
                        .and(ArticleSpecification.hasPrimaryColors(Collections.singletonList(outfitForm.getColorId())))
                        .and(ArticleSpecification.randomOrder());

            } else {
                specification = Specification.where(ArticleSpecification.fromUser(userId))
                        .and(ArticleSpecification.hasCategories(List.of(categories.get(i))))
                        .and(ArticleSpecification.hasStyles(Collections.singletonList(outfitForm.getStyleId())))
                        .and(ArticleSpecification.randomOrder());
            }
            try {
                outfit.add(articleService.findAll(specification).getFirst());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return outfit.stream().map(articleDtoMapper::toDto).toList();
    }
}
