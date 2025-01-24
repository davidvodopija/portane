package fer.portane.dto;

import lombok.Data;

import java.util.List;

@Data
public class ClosetDto {
    private Long id;
    private String title;
    private List<ClosetComponentDto> componentsList;
    private Double latitude;
    private Double longitude;
    private UserDto user;
}
