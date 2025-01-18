package fer.portane.dto;

import lombok.Data;

@Data
public class AdDto {
    ArticleDto article;
    Double price;
    GalleryDto gallery;
}
