package fer.portane.mapper;

import fer.portane.dto.ClosetComponentDto;
import fer.portane.model.lut.ClosetComponent;

public class ClosetComponentClosetComponentDtoMapper {
    public static ClosetComponentDto toClosetComponentDto(ClosetComponent closetComponent) {
        ClosetComponentDto closetComponentDto = new ClosetComponentDto();
        closetComponentDto.setId(closetComponent.getId());
        closetComponentDto.setLabel(closetComponent.getName());
        return closetComponentDto;
    }
}
