package fer.portane.controller;

import fer.portane.dto.GeneralResponse;
import fer.portane.dto.SellerDto;
import fer.portane.dto.TokenDto;
import fer.portane.dto.UserDto;
import fer.portane.facade.SellerFacade;
import fer.portane.facade.UserFacade;
import fer.portane.form.SellerForm;
import fer.portane.form.UserForm;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {
    @Autowired
    private SellerFacade sellerFacade;
    @PostMapping("/create")
    private ResponseEntity<GeneralResponse<SellerDto>> create(
            @Valid @RequestBody SellerForm userForm,
            BindingResult bindingResult) {
        GeneralResponse<SellerDto> generalResponse = new GeneralResponse<>();

        if (bindingResult.hasErrors()) {
            generalResponse.setErrors(
                    bindingResult.getAllErrors()
                            .stream()
                            .map(DefaultMessageSourceResolvable::getDefaultMessage)
                            .toList());
            return ResponseEntity.badRequest().body(generalResponse);
        }

        TokenDto token = new TokenDto();
        SellerDto sellerDto = sellerFacade.create(userForm, token);
        generalResponse.setResult(sellerDto);

        ResponseCookie cookie = ResponseCookie.from("accessToken", token.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();

        return ResponseEntity
                .created(null)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(generalResponse);
    }
}
