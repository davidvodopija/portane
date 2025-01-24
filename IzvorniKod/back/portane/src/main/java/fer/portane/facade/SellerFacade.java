package fer.portane.facade;

import fer.portane.dto.SellerDto;
import fer.portane.dto.TokenDto;
import fer.portane.form.SellerForm;

public interface SellerFacade {
    SellerDto create(SellerForm sellerForm, TokenDto tokenDto);
    SellerDto createOrLoginFromOAuth(SellerForm sellerForm, TokenDto tokenDto);
    SellerDto findById(Long id);
}
