package fer.portane.dto;

import lombok.Data;

import java.util.List;

@Data
public class ClosetDto {
    private String title;
    private List<ClosetComponentDto> componentsList;
}
