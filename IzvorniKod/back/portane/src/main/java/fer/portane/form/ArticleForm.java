package fer.portane.form;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class ArticleForm {
    Long id;
    @NotBlank
    private String label;

    private String picture;

    @NotNull
    private boolean isPublic;

    @NotNull
    private Long categoryId;

    @NotNull
    private Long conditionId;

    private Long footwearTypeId;

    @NotNull
    private Long primaryColorId;

    @NotNull
    private Long secondaryColorId;

    @NotEmpty
    @Size(min = 1, max = 5)
    private List<Long> styleIds;

    @NotNull
    private Long seasonId;

    private Long closetCustomComponentId;
}
