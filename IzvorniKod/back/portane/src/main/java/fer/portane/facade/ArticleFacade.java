package fer.portane.facade;

import fer.portane.dto.ArticleDto;
import fer.portane.form.ArticleForm;
import fer.portane.form.ArticleSearchForm;
import fer.portane.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ArticleFacade {
    ArticleDto save(ArticleForm form);
    void deleteById(Long id);
    ArticleDto findById(Long id);
    List<ArticleDto> findAllByClosetId(Long closetId);

    Page<ArticleDto> search(PageRequest pageRequest, ArticleSearchForm articleSearchForm);
}
