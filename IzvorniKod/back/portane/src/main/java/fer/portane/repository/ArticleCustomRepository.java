package fer.portane.repository;

import fer.portane.model.Article;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleCustomRepository {
    @Query("select a from Article a where a.closetCustomComponent.closet.id = :closetId")
    List<Article> findByClosetId(Long closetId);
}
