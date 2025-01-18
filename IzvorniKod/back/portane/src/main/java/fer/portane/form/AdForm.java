package fer.portane.form;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AdForm {
    Long id;
    ArticleForm article;
    @NotNull
    Long galleryId;
    Double price;
}
