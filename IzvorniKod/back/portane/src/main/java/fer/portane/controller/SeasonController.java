package fer.portane.controller;

import fer.portane.model.lut.Season;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/seasons")
public class SeasonController extends LutController<Season> {
}
