package fer.portane.controller;

import fer.portane.dto.AdDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.facade.AdFacade;
import fer.portane.form.AdForm;
import io.swagger.v3.oas.annotations.Operation;
import jdk.jfr.Description;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ads")
public class AdController {
    @Autowired
    private AdFacade adFacade;

    @PostMapping("/save")
    @Operation(description = "Kad se stvara novi oglas, id i article.id trebaju biti null. Kad se ažurira oglas, id i article.id ne smiju biti null, odnosno moraju biti oni koji se ažuriraju.")
    public ResponseEntity<GeneralResponse<AdDto>> save(@RequestBody AdForm adForm) {
        return ResponseEntity.ok(new GeneralResponse<>(adFacade.save(adForm)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GeneralResponse<Void>> delete(@PathVariable Long id) {
        adFacade.deleteById(id);
        return ResponseEntity.ok(new GeneralResponse<>());
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<GeneralResponse<AdDto>> get(@PathVariable Long id) {
        return ResponseEntity.ok(new GeneralResponse<>(adFacade.findById(id)));
    }

    @GetMapping("/get-in-gallery/{id}")
    public ResponseEntity<GeneralResponse<List<AdDto>>> getInGallery(@PathVariable Long id) {
        return ResponseEntity.ok(new GeneralResponse<>(adFacade.findAllByGalleryId(id)));
    }
}
