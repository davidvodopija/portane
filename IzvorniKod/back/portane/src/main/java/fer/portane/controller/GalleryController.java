package fer.portane.controller;

import fer.portane.dto.GalleryDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.facade.GalleryFacade;
import fer.portane.form.GalleryForm;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<GeneralResponse<List<GalleryDto>>> getBySeller(@PathVariable Long id) {
        return ResponseEntity.ok(new GeneralResponse<>(galleryFacade.getBySeller(id)));
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
