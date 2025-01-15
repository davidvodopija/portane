package fer.portane.service.impl;

import fer.portane.model.Article;
import fer.portane.repository.ArticleRepository;
import fer.portane.service.ArticleService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    @Override
    @Transactional
    @Modifying
    public Article save(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public void deleteById(Long id) {
        Article article = findById(id);
        article.getClosetCustomComponent().getArticles().remove(article);
        articleRepository.deleteById(id);
    }

    @Override
    public Article findById(Long id) {
        return articleRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Article with id = " + id + " not found"));
    }

    @Override
    public List<Article> findAllByClosetId(Long closetId) {
        return articleRepository.findByClosetId(closetId);
    }
}
