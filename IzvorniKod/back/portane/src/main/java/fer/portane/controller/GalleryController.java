package fer.portane.controller;

import fer.portane.dto.GalleryDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.facade.GalleryFacade;
import fer.portane.form.GalleryForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/galleries")
public class GalleryController {
    @Autowired
    private GalleryFacade galleryFacade;

    @PostMapping("/save")
    public ResponseEntity<GeneralResponse<GalleryDto>> save(@RequestBody GalleryForm galleryForm) {
        return ResponseEntity.ok(new GeneralResponse<>(galleryFacade.save(galleryForm)));
    }

    @GetMapping("/get-by-seller/{id}")
    public ResponseEntity<GeneralResponse<Page<GalleryDto>>> getBySeller(@PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), sortBy);
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(new GeneralResponse<>(galleryFacade.getBySeller(id, pageRequest)));
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<GeneralResponse<GalleryDto>> get(@PathVariable Long id) {
        return ResponseEntity.ok(new GeneralResponse<>(galleryFacade.findById(id)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GeneralResponse<Void>> delete(@PathVariable Long id) {
        galleryFacade.deleteById(id);
        return ResponseEntity.ok(new GeneralResponse<>());
    }
}
