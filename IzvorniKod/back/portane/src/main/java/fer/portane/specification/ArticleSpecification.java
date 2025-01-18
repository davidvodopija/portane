package fer.portane.specification;

import fer.portane.model.Article;
import fer.portane.model.lut.Style;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class ArticleSpecification {
    public static Specification<Article> labelLikeCaseInsensitive(String label) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get("label")), "%" + label.toLowerCase() + "%");
    }
    public static Specification<Article> hasCategories(List<Long> categoryIds) {
        return (root, query, criteriaBuilder) -> root.join("category").get("id").in(categoryIds);
    }

    public static Specification<Article> hasStyles(List<Long> styleIds) {
        return (root, query, criteriaBuilder) -> {
            Join<Article, Style> styleJoin = root.join("styles", JoinType.INNER);
            return styleJoin.get("id").in(styleIds);
        };
    }

    public static Specification<Article> hasPrimaryColors(List<Long> primaryColorIds) {
        return (root, query, criteriaBuilder) -> root.join("primaryColor").get("id").in(primaryColorIds);
    }

    public static Specification<Article> hasSecondaryColors(List<Long> secondaryColorIds) {
        return (root, query, criteriaBuilder) -> root.join("secondaryColor").get("id").in(secondaryColorIds);
    }

    public static Specification<Article> hasConditions(List<Long> conditionIds) {
        return (root, query, criteriaBuilder) -> root.join("condition").get("id").in(conditionIds);
    }

    public static Specification<Article> hasFootwearTypes(List<Long> footwearTypeIds) {
        return (root, query, criteriaBuilder) -> root.join("footwearType").get("id").in(footwearTypeIds);
    }

    public static Specification<Article> hasSeasons(List<Long> seasonIds) {
        return (root, query, criteriaBuilder) -> root.join("season").get("id").in(seasonIds);
    }

    public static Specification<Article> isPublic() {
        return (root, query, criteriaBuilder) -> criteriaBuilder.isTrue(root.get("isPublic"));
    }

    public static Specification<Article> fromUser(Long userId) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("closetCustomComponent")
                        .get("closet")
                        .get("user")
                        .get("id"), userId);
    }

    public static Specification<Article> fromCloset(Long closetId) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("closetCustomComponent")
                        .get("closet")
                        .get("id"), closetId);
    }
}
