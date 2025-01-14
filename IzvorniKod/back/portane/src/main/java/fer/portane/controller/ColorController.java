package fer.portane.controller;

import fer.portane.dto.GeneralResponse;
import fer.portane.dto.LutDto;
import fer.portane.model.lut.Color;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lut/colors")
public class ColorController extends LutController<Color> {
}
