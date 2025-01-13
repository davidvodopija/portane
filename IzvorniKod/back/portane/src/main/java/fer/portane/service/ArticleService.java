package fer.portane.service;

import fer.portane.model.Article;

import java.util.List;

public interface ArticleService {
    Article save(Article article);
    void deleteById(Long id);
    Article findById(Long id);
    List<Article> findAllByClosetId(Long closetId);
}
