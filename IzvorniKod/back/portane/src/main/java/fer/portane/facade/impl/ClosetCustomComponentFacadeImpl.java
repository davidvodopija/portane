package fer.portane.facade.impl;

import fer.portane.dto.ClosetCustomComponentDto;
import fer.portane.facade.ClosetCustomComponentFacade;
import fer.portane.form.ClosetCustomComponentForm;
import fer.portane.mapper.ClosetCustomComponentDtoMapper;
import fer.portane.model.Closet;
import fer.portane.model.ClosetCustomComponent;
import fer.portane.model.lut.ClosetComponent;
import fer.portane.service.AuthService;
import fer.portane.service.ClosetComponentService;
import fer.portane.service.ClosetCustomComponentService;
import fer.portane.service.ClosetService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
public class ClosetCustomComponentFacadeImpl implements ClosetCustomComponentFacade {
    @Autowired
    private ClosetCustomComponentService closetCustomComponentService;
    @Autowired
    private ClosetService closetService;
    @Autowired
    private ClosetComponentService closetComponentService;
    @Autowired
    private AuthService authService;

    @Override
    public List<ClosetCustomComponentDto> findForCloset(Long closetId) {
        Closet closet = closetService.findById(closetId);

        if (closet == null) {
            throw new RuntimeException("Closet with id = " + closetId + " not found");
        }

        if (closet.getUser().getId() != authService.getAuthenticatedUser().getId()) {
            throw new RuntimeException("Closet does not belong to this user");
        }

        return closet.getComponents()
                .stream().map(ClosetCustomComponentDtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ClosetCustomComponentDto save(Long id, String title) {
        ClosetCustomComponent closetCustomComponent = closetCustomComponentService.findById(id);

        if (closetCustomComponent == null) {
            throw new RuntimeException("ClosetCustomComponent with id = " + id + " not found");
        }

        if (!Objects.equals(closetCustomComponent.getCloset().getUser().getId(), authService.getAuthenticatedUser().getId())) {
            throw new RuntimeException("Closet does not belong to this user");
        }

        closetCustomComponent.setTitle(title);

        return ClosetCustomComponentDtoMapper.toDto(closetCustomComponentService.save(closetCustomComponent));
    }

    @Override
    public void delete(Long id) {
        Closet closet = closetCustomComponentService.findById(id).getCloset();
        if (!Objects.equals(closet.getUser().getId(), authService.getAuthenticatedUser().getId())) {
            throw new RuntimeException("Closet does not belong to this user");
        }
        closetCustomComponentService.delete(id);
    }

    @Override
    @Transactional
    public ClosetCustomComponentDto add(Long closetId, ClosetCustomComponentForm form) {
        Closet closet = closetService.findById(closetId);
        ClosetComponent closetComponent = closetComponentService.findById(form.getComponentId());

        if (closetComponent == null) {
            throw new RuntimeException("ClosetComponent with id = " + form.getComponentId() + " not found");
        }

        if (closet == null) {
            throw new RuntimeException("Closet with id = " + closetId + " not found");
        }

        if (!Objects.equals(closet.getUser().getId(), authService.getAuthenticatedUser().getId())) {
            throw new RuntimeException("Closet does not belong to this user");
        }

        ClosetCustomComponent closetCustomComponent = new ClosetCustomComponent();
        closetCustomComponent.setCloset(closet);
        closetCustomComponent.setClosetComponent(closetComponent);
        closetCustomComponent.setTitle(form.getTitle());
        return ClosetCustomComponentDtoMapper.toDto(closetCustomComponentService.save(closetCustomComponent));
    }
}
