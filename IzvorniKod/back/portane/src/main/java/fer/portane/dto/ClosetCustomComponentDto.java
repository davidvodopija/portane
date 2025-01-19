package fer.portane.dto;

import lombok.Data;

@Data
public class ClosetCustomComponentDto {
    private Long id;
    private String title;
    private String componentType;
    private Long closetId;
}
