package fer.portane.service.impl;

import fer.portane.model.Article;
import fer.portane.repository.ArticleRepository;
import fer.portane.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService {
    @Autowired
    private ArticleRepository articleRepository;
    @Override
    public Article save(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public void deleteById(Long id) {
        articleRepository.deleteById(id);
    }

    @Override
    public Article findById(Long id) {
        return articleRepository.findById(id).orElse(null);
    }

    @Override
    public List<Article> findAllByClosetId(Long closetId) {
        return articleRepository.findByClosetId(closetId);
    }
}
