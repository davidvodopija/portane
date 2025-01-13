package fer.portane.mapper;

import fer.portane.dto.LutDto;
import fer.portane.model.lut.LutBase;
import org.springframework.stereotype.Component;

@Component
public class LutDtoMapper<T extends LutBase> {
    public LutDto toDto(T entity) {
        LutDto lutDto = new LutDto();
        lutDto.setId(entity.getId());
        lutDto.setName(entity.getName());
        return lutDto;
    }
}
