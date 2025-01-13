package fer.portane.dto;

import lombok.Data;

import java.util.List;

@Data
public class ArticleDto {
    private Long id;
    private String label;
    private String picture;
    private boolean isPublic;
    private LutDto category;
    private LutDto condition;
    private LutDto footwearType;
    private LutDto primaryColor;
    private LutDto secondaryColor;
    private List<LutDto> styles;
    private List<LutDto> seasons;
    private ClosetCustomComponentDto closetCustomComponent;
}
