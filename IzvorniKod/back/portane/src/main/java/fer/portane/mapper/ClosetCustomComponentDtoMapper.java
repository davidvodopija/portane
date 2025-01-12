package fer.portane.mapper;

import fer.portane.dto.ClosetCustomComponentDto;
import fer.portane.model.ClosetCustomComponent;
import org.springframework.stereotype.Component;

@Component
public class ClosetCustomComponentDtoMapper {
    public static ClosetCustomComponentDto toClosetCustomComponentDto(ClosetCustomComponent closetCustomComponent) {
        ClosetCustomComponentDto closetCustomComponentDto = new ClosetCustomComponentDto();
        closetCustomComponentDto.setId(closetCustomComponent.getId());
        closetCustomComponentDto.setTitle(closetCustomComponent.getTitle());
        closetCustomComponentDto.setComponentType(closetCustomComponent.getClosetComponent().getLabel());
        return closetCustomComponentDto;
    }
}
