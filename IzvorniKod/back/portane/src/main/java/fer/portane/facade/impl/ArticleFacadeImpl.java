package fer.portane.facade.impl;

import fer.portane.dto.ArticleDto;
import fer.portane.facade.ArticleFacade;
import fer.portane.form.ArticleForm;
import fer.portane.mapper.ArticleArticleDtoMapper;
import fer.portane.model.Article;
import fer.portane.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

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
    @Override
    public ArticleDto save(ArticleForm form) {
        Article article = new Article();
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

        article.setSeasons(form.getSeasonIds().stream().map(seasonService::findById).toList());
        article.setStyles(form.getStyleIds().stream().map(styleService::findById).toList());

        return articleDtoMapper.toDto(articleService.save(article));
    }

    @Override
    public void deleteById(Long id) {
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
