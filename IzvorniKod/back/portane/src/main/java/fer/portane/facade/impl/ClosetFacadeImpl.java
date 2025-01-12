package fer.portane.facade.impl;

import fer.portane.dto.ClosetDto;
import fer.portane.exception.NotFound;
import fer.portane.facade.ClosetFacade;
import fer.portane.form.ClosetForm;
import fer.portane.mapper.ClosetClosetDtoMapper;
import fer.portane.model.Closet;
import fer.portane.model.ClosetCustomComponent;
import fer.portane.model.User;
import fer.portane.service.AuthService;
import fer.portane.service.ClosetComponentService;
import fer.portane.service.ClosetService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ClosetFacadeImpl implements ClosetFacade {
    @Autowired
    private ClosetService closetService;

    @Autowired
    private AuthService authService;

    @Autowired
    private ClosetComponentService closetComponentService;

    @Transactional
    @Override
    public ClosetDto create(ClosetForm closetForm) {
        User user = authService.getAuthenticatedUser();

        Closet closet = new Closet();
        closet.setTitle(closetForm.getTitle());
        closet.setUser(user);

        closet.setComponents(new ArrayList<>());

        closetForm.getComponentsList().forEach(componentForm -> {
            for (int index = 1; index <= componentForm.getQuantity(); index++) {
                ClosetCustomComponent closetCustomComponent = new ClosetCustomComponent();
                closetCustomComponent.setCloset(closet);
                closetCustomComponent.setClosetComponent(
                        closetComponentService
                                .findById(componentForm.getId())
                                .orElseThrow(() -> new NotFound(String.format("Closet component with id = %s not found", componentForm.getId())))
                );
                closetCustomComponent.setTitle(closetCustomComponent.getClosetComponent().getLabel() + " " + index);
                closet.getComponents().add(closetCustomComponent);
            }
        });

        return ClosetClosetDtoMapper.toClosetDto(closetService.save(closet));
    }

    @Override
    public List<ClosetDto> findAllForAuthenticatedUser() {
        User user = authService.getAuthenticatedUser();
        return closetService.findAllByUserId(user.getId()).stream()
                .map(ClosetClosetDtoMapper::toClosetDto)
                .toList();
    }

    @Override
    public void delete(Long id) {
        closetService.deleteById(id);
    }
}
