package fer.portane.facade.impl;

import fer.portane.dto.SellerDto;
import fer.portane.dto.TokenDto;
import fer.portane.dto.UserDto;
import fer.portane.facade.SellerFacade;
import fer.portane.facade.UserFacade;
import fer.portane.form.SellerForm;
import fer.portane.form.UserForm;
import fer.portane.mapper.SellerSellerDtoMapper;
import fer.portane.model.Seller;
import fer.portane.service.SellerService;
import fer.portane.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SellerFacadeImpl implements SellerFacade {
    @Autowired
    private SellerService sellerService;
    @Autowired
    private UserFacade userFacade;
    @Autowired
    private UserService userService;

    @Override
    public SellerDto create(SellerForm sellerForm, TokenDto tokenDto) {
        Seller seller = new Seller();

        seller.setName(sellerForm.getName());
        seller.setLogo(sellerForm.getLogo());

        UserForm userForm = UserForm.builder()
                .email(sellerForm.getEmail())
                .password(sellerForm.getPassword())
                .firstname(sellerForm.getName())
                .lastname("Automatically created user for seller")
                .build();

        userFacade.create(userForm, tokenDto);
        seller.setUser(userService.getUserByEmail(sellerForm.getEmail()).orElseThrow(() -> new RuntimeException("User not found.")));

        sellerService.save(seller);
        return SellerSellerDtoMapper.toDto(seller);
    }

    @Override
    public SellerDto findById(Long id) {
        return null;
    }
}
