package fer.portane.controller;

import fer.portane.dto.ClosetDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.facade.ClosetFacade;
import fer.portane.form.ClosetForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/closets")
public class ClosetController {
    @Autowired
    private ClosetFacade closetFacade;

    @PostMapping("/create")
    public ResponseEntity<GeneralResponse<ClosetDto>> create(@RequestBody ClosetForm closetForm) {
        GeneralResponse<ClosetDto> generalResponse = new GeneralResponse<>();
        generalResponse.setResult(closetFacade.create(closetForm));
        return ResponseEntity.ok(generalResponse);
    }

    @GetMapping("/my-closets")
    public ResponseEntity<GeneralResponse<List<ClosetDto>>> findAllForAuthenticatedUser() {
        GeneralResponse<List<ClosetDto>> generalResponse = new GeneralResponse<>();
        generalResponse.setResult(closetFacade.findAllForAuthenticatedUser());
        return ResponseEntity.ok(generalResponse);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GeneralResponse<Void>> delete(@PathVariable Long id) {
        GeneralResponse<Void> generalResponse = new GeneralResponse<>();
        closetFacade.delete(id);
        return ResponseEntity.ok(generalResponse);
    }
}
