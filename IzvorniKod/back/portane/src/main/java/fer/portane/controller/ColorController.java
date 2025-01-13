package fer.portane.controller;

import fer.portane.model.lut.Color;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/colors")
public class ColorController extends LutController<Color> {
}
