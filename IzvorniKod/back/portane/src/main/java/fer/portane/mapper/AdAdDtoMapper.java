package fer.portane.mapper;

import fer.portane.dto.AdDto;
import fer.portane.model.Ad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AdAdDtoMapper {
    @Autowired
    private ArticleArticleDtoMapper articleDtoMapper;
    public AdDto toDto(Ad ad) {
        AdDto adDto = new AdDto();
        adDto.setArticle(articleDtoMapper.toDto(ad.getArticle()));
        adDto.setPrice(ad.getPrice());
        adDto.setGallery(GalleryGalleryDtoMapper.toDto(ad.getGallery()));
        return adDto;
    }
}
