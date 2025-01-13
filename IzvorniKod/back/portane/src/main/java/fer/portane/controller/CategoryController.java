package fer.portane.controller;

import fer.portane.model.lut.Category;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController extends LutController<Category> {
}
