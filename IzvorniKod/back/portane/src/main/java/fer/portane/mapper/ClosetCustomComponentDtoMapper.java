package fer.portane.mapper;

import fer.portane.dto.ClosetCustomComponentDto;
import fer.portane.model.ClosetCustomComponent;
import org.springframework.stereotype.Component;

@Component
public class ClosetCustomComponentDtoMapper {
    public static ClosetCustomComponentDto toDto(ClosetCustomComponent closetCustomComponent) {
        if (closetCustomComponent == null)
            return null;
        ClosetCustomComponentDto closetCustomComponentDto = new ClosetCustomComponentDto();
        closetCustomComponentDto.setId(closetCustomComponent.getId());
        closetCustomComponentDto.setTitle(closetCustomComponent.getTitle());
        closetCustomComponentDto.setComponentType(closetCustomComponent.getClosetComponent().getName());
        closetCustomComponentDto.setCloset(ClosetClosetDtoMapper.toClosetDto(closetCustomComponent.getCloset()));
        return closetCustomComponentDto;
    }
}
