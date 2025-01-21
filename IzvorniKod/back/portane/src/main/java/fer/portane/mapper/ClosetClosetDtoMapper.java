package fer.portane.mapper;

import fer.portane.dto.ClosetComponentWithQuantityDto;
import fer.portane.dto.ClosetDto;
import fer.portane.model.Closet;
import fer.portane.model.ClosetCustomComponent;

import java.util.stream.Collectors;

public class ClosetClosetDtoMapper {
    public static ClosetDto toClosetDto(Closet closet) {
        ClosetDto closetDto = new ClosetDto();
        closetDto.setId(closet.getId());
        closetDto.setTitle(closet.getTitle());
        closetDto.setComponentsList(closet.getComponents().stream()
                .collect(Collectors.groupingBy(ClosetCustomComponent::getClosetComponent))
                .entrySet().stream()
                .map(entry -> {
                    ClosetComponentWithQuantityDto closetComponentWithQuantityDto = new ClosetComponentWithQuantityDto();
                    closetComponentWithQuantityDto.setId(entry.getKey().getId());
                    closetComponentWithQuantityDto.setLabel(entry.getKey().getName());
                    closetComponentWithQuantityDto.setQuantity(entry.getValue().size());
                    return closetComponentWithQuantityDto;
                })
                .collect(Collectors.toList())
        );
        closetDto.setLatitude(closet.getLatitude());
        closetDto.setLongitude(closet.getLongitude());
        return closetDto;
    }
}
