package fer.portane.facade.impl;

import fer.portane.dto.ClosetComponentDto;
import fer.portane.facade.ClosetComponentFacade;
import fer.portane.mapper.ClosetComponentClosetComponentDtoMapper;
import fer.portane.service.ClosetComponentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ClosetComponentFacadeImpl implements ClosetComponentFacade {
    @Autowired
    private ClosetComponentService closetComponentService;

    @Override
    public List<ClosetComponentDto> findAll() {
        return closetComponentService.findAll().stream()
                .map(ClosetComponentClosetComponentDtoMapper::toClosetComponentDto)
                .toList();
    }
}
