package fer.portane.specification;

import fer.portane.model.Ad;
import fer.portane.model.Article;
import fer.portane.model.lut.Style;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class AdSpecification {
    public static Specification<Ad> labelLikeCaseInsensitive(String label) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get("article").get("label")), "%" + label.toLowerCase() + "%");
    }
    public static Specification<Ad> hasCategories(List<Long> categoryIds) {
        return (root, query, criteriaBuilder) -> root.join("article").join("category").get("id").in(categoryIds);
    }

    public static Specification<Ad> hasStyles(List<Long> styleIds) {
        return (root, query, criteriaBuilder) -> {
            Join<Ad, Article> articleJoin = root.join("article", JoinType.INNER);
            Join<Article, Style> styleJoin = articleJoin.join("styles", JoinType.INNER);
            return styleJoin.get("id").in(styleIds);
        };
    }

    public static Specification<Ad> hasPrimaryColors(List<Long> primaryColorIds) {
        return (root, query, criteriaBuilder) -> root.join("article").join("primaryColor").get("id").in(primaryColorIds);
    }

    public static Specification<Ad> hasSecondaryColors(List<Long> secondaryColorIds) {
        return (root, query, criteriaBuilder) -> root.join("article").join("secondaryColor").get("id").in(secondaryColorIds);
    }

    public static Specification<Ad> hasConditions(List<Long> conditionIds) {
        return (root, query, criteriaBuilder) -> root.join("article").join("condition").get("id").in(conditionIds);
    }

    public static Specification<Ad> hasFootwearTypes(List<Long> footwearTypeIds) {
        return (root, query, criteriaBuilder) -> root.join("article").join("footwearType").get("id").in(footwearTypeIds);
    }

    public static Specification<Ad> hasSeasons(List<Long> seasonIds) {
        return (root, query, criteriaBuilder) -> root.join("article").join("season").get("id").in(seasonIds);
    }

    public static Specification<Ad> hasPriceRange(Double minPrice, Double maxPrice) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.between(root.get("price"), minPrice, maxPrice);
    }

    public static Specification<Ad> fromSeller(Long sellerId) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("gallery").get("seller").get("id"), sellerId);
    }

    public static Specification<Ad> fromGallery(Long galleryId) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("gallery").get("id"), galleryId);
    }
}
