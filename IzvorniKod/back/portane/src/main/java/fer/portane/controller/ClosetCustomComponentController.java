package fer.portane.controller;

import fer.portane.dto.ClosetCustomComponentDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.form.ClosetCustomComponentForm;
import fer.portane.mapper.ClosetCustomComponentDtoMapper;
import fer.portane.model.ClosetCustomComponent;
import fer.portane.service.ClosetCustomComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/closet-custom-component")
public class ClosetCustomComponentController {
    @Autowired
    private ClosetCustomComponentService closetCustomComponentService;

    @GetMapping("/find-for-closet/{id}")
    public ResponseEntity<GeneralResponse<List<ClosetCustomComponentDto>>> findForCloset(@PathVariable Long id) {
        return ResponseEntity.ok(new GeneralResponse<>(closetCustomComponentService.findForCloset(id)
                .stream().map(ClosetCustomComponentDtoMapper::toClosetCustomComponentDto)
                .collect(Collectors.toList())));
    }

    @PutMapping("/save/{id}")
    public ResponseEntity<GeneralResponse<ClosetCustomComponentDto>> save(@PathVariable Long id, @RequestBody ClosetCustomComponentForm form) {
        return ResponseEntity.ok(new GeneralResponse<>(ClosetCustomComponentDtoMapper
                .toClosetCustomComponentDto(
                        closetCustomComponentService.save(id, form.getTitle()))));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GeneralResponse<Void>> delete(@PathVariable Long id) {
        closetCustomComponentService.delete(id);
        return ResponseEntity.ok(new GeneralResponse<>());
    }
}
