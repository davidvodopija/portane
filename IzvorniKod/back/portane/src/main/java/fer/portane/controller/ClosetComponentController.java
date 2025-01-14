package fer.portane.controller;

import fer.portane.dto.ClosetComponentDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.model.lut.ClosetComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lut/closet-components")
public class ClosetComponentController extends LutController<ClosetComponent> {
}
