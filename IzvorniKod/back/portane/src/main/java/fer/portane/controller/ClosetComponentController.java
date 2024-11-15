package fer.portane.controller;

import fer.portane.dto.ClosetComponentDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.facade.ClosetComponentFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/closet-components")
public class ClosetComponentController {
    @Autowired
    private ClosetComponentFacade closetComponentFacade;

    @GetMapping
    public ResponseEntity<GeneralResponse<List<ClosetComponentDto>>> findAll() {
        GeneralResponse<List<ClosetComponentDto>> response = new GeneralResponse<>();

        response.setResult(closetComponentFacade.findAll());

        return ResponseEntity.ok(response);
    }
}
