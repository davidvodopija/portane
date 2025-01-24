package fer.portane.facade.impl;

import fer.portane.dto.ClosetDto;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class ClosetFacadeImpl implements ClosetFacade {
    @Autowired
    private ClosetService closetService;

    @Autowired
    private AuthService authService;

    @Autowired
    private ClosetComponentService closetComponentService;

    @Override
    public ClosetDto save(ClosetForm closetForm) {
        Closet closet = closetService.findById(closetForm.getId());
        closet.setTitle(closetForm.getTitle());
        closet.setLatitude(closetForm.getLatitude());
        closet.setLongitude(closetForm.getLongitude());
        closetService.save(closet);
        return ClosetClosetDtoMapper.toClosetDto(closet);
    }

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
                );
                closetCustomComponent.setTitle(closetCustomComponent.getClosetComponent().getName() + " " + index);
                closet.getComponents().add(closetCustomComponent);
            }
        });

        closet.setLatitude(closetForm.getLatitude());
        closet.setLongitude(closetForm.getLongitude());

        return ClosetClosetDtoMapper.toClosetDto(closetService.save(closet));
    }

    @Override
    public Page<ClosetDto> findAllForAuthenticatedUser(PageRequest pageRequest) {
        User user = authService.getAuthenticatedUser();
        return closetService.findAllByUserId(user.getId(), pageRequest).map(ClosetClosetDtoMapper::toClosetDto);
    }

    @Override
    public void delete(Long id) {
        closetService.deleteById(id);
    }
}
