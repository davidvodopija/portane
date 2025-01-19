package fer.portane.controller;

import fer.portane.model.lut.Style;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lut/styles")
public class StyleController extends LutController<Style> {
}
