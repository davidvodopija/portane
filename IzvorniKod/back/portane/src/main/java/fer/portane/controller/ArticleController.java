package fer.portane.controller;

import fer.portane.dto.ArticleDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.facade.ArticleFacade;
import fer.portane.form.ArticleForm;
import fer.portane.form.ArticleSearchForm;
import fer.portane.form.OutfitForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    @PostMapping("/search")
    public ResponseEntity<GeneralResponse<Page<ArticleDto>>> search(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "label") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder,
            @RequestBody ArticleSearchForm articleSearchForm) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), sortBy);
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(new GeneralResponse<>(articleFacade.search(pageRequest, articleSearchForm)));
    }

    @PostMapping("/generate-outfit")
    public ResponseEntity<GeneralResponse<List<ArticleDto>>> generateOutfit(@RequestBody OutfitForm outfitForm) {
        return ResponseEntity.ok(new GeneralResponse<>(articleFacade.generateOutfit(outfitForm)));
    }
}
