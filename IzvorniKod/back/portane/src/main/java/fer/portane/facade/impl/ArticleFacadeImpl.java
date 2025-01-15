package fer.portane.facade.impl;

import fer.portane.dto.ArticleDto;
import fer.portane.facade.ArticleFacade;
import fer.portane.form.ArticleForm;
import fer.portane.mapper.ArticleArticleDtoMapper;
import fer.portane.model.Article;
import fer.portane.model.ClosetCustomComponent;
import fer.portane.model.lut.Style;
import fer.portane.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
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
        article.setFootwearType(footwearTypeService.findById(form.getFootwearTypeId()));
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

        if (!Objects.equals(article.getClosetCustomComponent().getCloset().getId(), authService.getAuthenticatedUser().getId())){
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
}
