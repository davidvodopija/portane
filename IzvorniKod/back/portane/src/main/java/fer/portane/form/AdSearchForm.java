package fer.portane.form;

import lombok.Data;

@Data
public class AdSearchForm {
    private ArticleSearchForm articleSearchForm;
    private Double minPrice;
    private Double maxPrice;
    private Long sellerId;
    private Long galleryId;
}
