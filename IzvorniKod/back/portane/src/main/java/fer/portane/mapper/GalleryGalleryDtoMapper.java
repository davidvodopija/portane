package fer.portane.mapper;

import fer.portane.dto.GalleryDto;
import fer.portane.model.Gallery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GalleryGalleryDtoMapper {
    public static GalleryDto toDto(Gallery gallery) {
        GalleryDto galleryDto = new GalleryDto();
        galleryDto.setId(gallery.getId());
        galleryDto.setName(gallery.getName());
        galleryDto.setSellerDto(SellerSellerDtoMapper.toDto(gallery.getSeller()));
        galleryDto.setAdsCount(gallery.getAds().size());
        return galleryDto;
    }
}
