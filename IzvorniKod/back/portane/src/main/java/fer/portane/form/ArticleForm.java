package fer.portane.form;

import lombok.Data;

import java.util.List;

@Data
public class ArticleForm {
    private String label;
    private String picture;
    private boolean isPublic;
    private Long categoryId;
    private Long conditionId;
    private Long footwearTypeId;
    private Long primaryColorId;
    private Long secondaryColorId;
    private List<Long> styleIds;
    private List<Long> seasonIds;
    private Long closetCustomComponentId;
}
