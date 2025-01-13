package fer.portane.mapper;

import fer.portane.dto.ArticleDto;
import fer.portane.dto.LutDto;
import fer.portane.model.Article;
import fer.portane.model.lut.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.swing.plaf.synth.ColorType;

@Component
public class ArticleArticleDtoMapper {
    @Autowired
    LutDtoMapper<Category> categoryLutDtoMapper;
    @Autowired
    LutDtoMapper<Condition> conditionLutDtoMapper;
    @Autowired
    LutDtoMapper<Style> styleLutDtoMapper;
    @Autowired
    LutDtoMapper<Season> seasonLutDtoMapper;
    @Autowired
    LutDtoMapper<Color> colorLutDtoMapper;
    @Autowired
    LutDtoMapper<FootwearType> footwearTypeLutDtoMapper;

    public ArticleDto toDto(Article article) {
        ArticleDto articleDto = new ArticleDto();

        articleDto.setId(article.getId());
        articleDto.setLabel(article.getLabel());
        articleDto.setPicture(article.getPicture());
        articleDto.setPublic(article.isPublic());
        articleDto.setCategory(categoryLutDtoMapper.toDto(article.getCategory()));
        articleDto.setCondition(conditionLutDtoMapper.toDto(article.getCondition()));
        articleDto.setFootwearType(footwearTypeLutDtoMapper.toDto(article.getFootwearType()));
        articleDto.setPrimaryColor(colorLutDtoMapper.toDto(article.getPrimaryColor()));
        articleDto.setSecondaryColor(colorLutDtoMapper.toDto(article.getSecondaryColor()));
        articleDto.setSeasons(article.getSeasons().stream().map(seasonLutDtoMapper::toDto).toList());
        articleDto.setStyles(article.getStyles().stream().map(styleLutDtoMapper::toDto).toList());
        articleDto.setClosetCustomComponent(ClosetCustomComponentDtoMapper.toDto(article.getClosetCustomComponent()));

        return articleDto;
    }
}
