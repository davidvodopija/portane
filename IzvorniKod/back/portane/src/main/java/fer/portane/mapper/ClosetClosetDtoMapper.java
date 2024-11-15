package fer.portane.mapper;

import fer.portane.dto.ClosetComponentWithQuantityDto;
import fer.portane.dto.ClosetDto;
import fer.portane.model.Closet;

import java.util.stream.Collectors;

public class ClosetClosetDtoMapper {
    public static ClosetDto toClosetDto(Closet closet) {
        ClosetDto closetDto = new ClosetDto();
        closetDto.setId(closet.getId());
        closetDto.setTitle(closet.getTitle());
        closetDto.setComponentsList(closet.getComponents().stream()
                .map(closetClosetComponent -> {
                    ClosetComponentWithQuantityDto closetComponentWithQuantityDto = new ClosetComponentWithQuantityDto();
                    closetComponentWithQuantityDto.setId(closetClosetComponent.getClosetComponent().getId());
                    closetComponentWithQuantityDto.setLabel(closetClosetComponent.getClosetComponent().getLabel());
                    closetComponentWithQuantityDto.setQuantity(closetClosetComponent.getQuantity());
                    return closetComponentWithQuantityDto;
                })
                .collect(Collectors.toList()));
        return closetDto;
    }
}
