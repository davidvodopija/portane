package fer.portane.controller;

import fer.portane.dto.ClosetCustomComponentDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.facade.ClosetCustomComponentFacade;
import fer.portane.form.ClosetCustomComponentForm;
import fer.portane.mapper.ClosetCustomComponentDtoMapper;
import fer.portane.service.ClosetCustomComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/closet-custom-components")
public class ClosetCustomComponentController {
    @Autowired
    private ClosetCustomComponentFacade closetCustomComponentFacade;

    @GetMapping("/find-for-closet/{id}")
    public ResponseEntity<GeneralResponse<List<ClosetCustomComponentDto>>> findForCloset(@PathVariable Long id) {
        return ResponseEntity.ok(new GeneralResponse<>(closetCustomComponentFacade.findForCloset(id)));
    }

    @PutMapping("/save/{id}")
    public ResponseEntity<GeneralResponse<ClosetCustomComponentDto>> save(@PathVariable Long id, @RequestBody ClosetCustomComponentForm form) {
        return ResponseEntity.ok(new GeneralResponse<>(closetCustomComponentFacade.save(id, form.getTitle())));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GeneralResponse<Void>> delete(@PathVariable Long id) {
        closetCustomComponentFacade.delete(id);
        return ResponseEntity.ok(new GeneralResponse<>());
    }

    @PostMapping("/add/{closetId}")
    public ResponseEntity<GeneralResponse<ClosetCustomComponentDto>> add(@PathVariable Long closetId, @RequestBody ClosetCustomComponentForm form) {
        return ResponseEntity.ok(new GeneralResponse<>(closetCustomComponentFacade.add(closetId, form)));
    }
}
