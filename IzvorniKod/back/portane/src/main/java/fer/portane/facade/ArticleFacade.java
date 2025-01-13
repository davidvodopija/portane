package fer.portane.facade;

import fer.portane.dto.ArticleDto;
import fer.portane.form.ArticleForm;
import fer.portane.model.Article;

import java.util.List;

public interface ArticleFacade {
    ArticleDto save(ArticleForm form);
    void deleteById(Long id);
    ArticleDto findById(Long id);
    List<ArticleDto> findAllByClosetId(Long closetId);
}
