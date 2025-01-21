package fer.portane.repository;

import fer.portane.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long>,
        JpaSpecificationExecutor<Article>, ArticleCustomRepository {
    @Query(value = "SELECT * FROM get_closest_articles(:latitude, :longitude, :count, :userId)", nativeQuery = true)
    List<Article> findClosestArticles(
            @Param("latitude") Double latitude,
            @Param("longitude") Double longitude,
            @Param("count") int count,
            @Param("userId") Integer userId
    );
}
