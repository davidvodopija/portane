package fer.portane.form;

import lombok.Data;

import java.util.List;

@Data
public class ArticleSearchForm {
    private String label;
    private List<Long> categoryIds;
    private List<Long> conditionIds;
    private List<Long> styleIds;
    private List<Long> primaryColorIds;
    private List<Long> secondaryColorIds;
    private List<Long> seasonIds;
    private List<Long> footwearTypeIds;
    private Long userId;
    private Long closetId;
    private List<Long> closetComponentIds;
    private boolean isPublic;
}
