package fer.portane.controller;

import fer.portane.dto.ArticleDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.facade.ArticleFacade;
import fer.portane.form.ArticleForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    @Autowired
    private ArticleFacade articleFacade;

    @PostMapping("/save")
    public ResponseEntity<GeneralResponse<ArticleDto>> save(@RequestBody ArticleForm form) {
        return ResponseEntity.ok(new GeneralResponse<>(articleFacade.save(form)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GeneralResponse<Void>> delete(@PathVariable Long id) {
        articleFacade.deleteById(id);
        return ResponseEntity.ok(new GeneralResponse<>());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<GeneralResponse<ArticleDto>> findById(@PathVariable Long id) {
        return ResponseEntity.ok(new GeneralResponse<>(articleFacade.findById(id)));
    }

    @GetMapping("/search-in-closet/{closetId}")
    public ResponseEntity<GeneralResponse<List<ArticleDto>>> findAllByClosetId(@PathVariable Long closetId) {
        return ResponseEntity.ok(new GeneralResponse<>(articleFacade.findAllByClosetId(closetId)));
    }
}
