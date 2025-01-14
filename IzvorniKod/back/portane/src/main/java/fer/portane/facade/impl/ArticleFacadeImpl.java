package fer.portane.facade.impl;

import fer.portane.dto.ArticleDto;
import fer.portane.facade.ArticleFacade;
import fer.portane.form.ArticleForm;
import fer.portane.mapper.ArticleArticleDtoMapper;
import fer.portane.model.Article;
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
        Article article = articleService.findById(form.getId());

        article.setLabel(form.getLabel());
        article.setPicture(form.getPicture());
        article.setPublic(form.isPublic());

        if (form.getClosetCustomComponentId() != null) {
            article.setClosetCustomComponent(closetCustomComponentService.findById(form.getClosetCustomComponentId()));
        }

        article.setCondition(conditionService.findById(form.getConditionId()));
        article.setCategory(categoryService.findById(form.getCategoryId()));
        article.setFootwearType(footwearTypeService.findById(form.getFootwearTypeId()));
        article.setPrimaryColor(colorService.findById(form.getPrimaryColorId()));
        article.setSecondaryColor(colorService.findById(form.getSecondaryColorId()));

        article.setSeason(seasonService.findById(form.getSeasonId()));
        article.setStyles(form.getStyleIds().stream().map(styleService::findById).filter(Objects::nonNull).toList());

        return articleDtoMapper.toDto(articleService.save(article));
    }

    @Override
    public void deleteById(Long id) {
        Article article = articleService.findById(id);

        if (!Objects.equals(article.getClosetCustomComponent().getCloset().getId(), authService.getAuthenticatedUser().getId())){
            throw new RuntimeException("You are not allowed to delete this article");
        }

        if (article == null) {
            throw new RuntimeException("Article with id = " + id + " not found");
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
