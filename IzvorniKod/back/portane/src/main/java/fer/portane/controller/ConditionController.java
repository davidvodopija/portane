package fer.portane.controller;

import fer.portane.model.lut.Condition;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/conditions")
public class ConditionController extends LutController<Condition> {
}
