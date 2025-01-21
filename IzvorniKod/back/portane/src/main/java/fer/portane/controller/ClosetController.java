package fer.portane.controller;

import fer.portane.dto.ClosetDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.facade.ClosetFacade;
import fer.portane.form.ClosetForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    public ResponseEntity<GeneralResponse<Page<ClosetDto>>> findAllForAuthenticatedUser(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), sortBy);
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        GeneralResponse<Page<ClosetDto>> generalResponse = new GeneralResponse<>();
        generalResponse.setResult(closetFacade.findAllForAuthenticatedUser(pageRequest));
        return ResponseEntity.ok(generalResponse);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GeneralResponse<Void>> delete(@PathVariable Long id) {
        GeneralResponse<Void> generalResponse = new GeneralResponse<>();
        closetFacade.delete(id);
        return ResponseEntity.ok(generalResponse);
    }

    @PutMapping("/save")
    public ResponseEntity<GeneralResponse<ClosetDto>> save(@RequestBody ClosetForm closetForm) {
        GeneralResponse<ClosetDto> generalResponse = new GeneralResponse<>();
        generalResponse.setResult(closetFacade.save(closetForm));
        return ResponseEntity.ok(generalResponse);
    }
}
