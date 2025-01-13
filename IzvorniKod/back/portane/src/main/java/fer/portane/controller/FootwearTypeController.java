package fer.portane.controller;

import fer.portane.model.lut.FootwearType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/footwear-types")
public class FootwearTypeController extends LutController<FootwearType> {
}
