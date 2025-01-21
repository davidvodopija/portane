package fer.portane.dto;

import lombok.Data;

@Data
public class AdDto {
    Long id;
    ArticleDto article;
    Double price;
    GalleryDto gallery;
}
