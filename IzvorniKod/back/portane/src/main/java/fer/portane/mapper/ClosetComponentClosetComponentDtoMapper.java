package fer.portane.mapper;

import fer.portane.dto.ClosetComponentDto;
import fer.portane.dto.ClosetComponentWithQuantityDto;
import fer.portane.model.ClosetClosetComponent;
import fer.portane.model.ClosetComponent;

public class ClosetComponentClosetComponentDtoMapper {
    public static ClosetComponentDto toClosetComponentDto(ClosetComponent closetComponent) {
        ClosetComponentDto closetComponentDto = new ClosetComponentDto();
        closetComponentDto.setId(closetComponent.getId());
        closetComponentDto.setLabel(closetComponent.getLabel());
        return closetComponentDto;
    }
}
