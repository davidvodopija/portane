package fer.portane.service;

import fer.portane.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import java.nio.channels.FileChannel;
import java.util.List;

public interface ArticleService {
    Article save(Article article);
    void deleteById(Long id);
    Article findById(Long id);
    List<Article> findAllByClosetId(Long closetId);

    Page<Article> search(PageRequest pageRequest, Specification<Article> specification);
    List<Article> findAll(Specification<Article> specification);
}
