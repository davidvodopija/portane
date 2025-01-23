package fer.portane.controller;

import fer.portane.dto.GeneralResponse;
import fer.portane.dto.SellerDto;
import fer.portane.dto.TokenDto;
import fer.portane.facade.SellerFacade;
import fer.portane.form.SellerForm;
import fer.portane.service.OAuth2Service;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sellers")
public class SellerController {
    @Autowired
    private SellerFacade sellerFacade;
    @Autowired
    private OAuth2Service oAuth2Service;

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

    @GetMapping("/oauth2/google")
    public ResponseEntity<GeneralResponse<SellerDto>> createGoogleSeller(@RequestParam(value = "code") String code) {
        String accessToken = oAuth2Service.getOauthAccessTokenGoogle(code, "seller");
        SellerForm sellerForm = oAuth2Service.getSellerFormGoogle(accessToken);

        TokenDto token = new TokenDto();
        SellerDto sellerDto = sellerFacade.createOrLoginFromOAuth(sellerForm, token);
        ResponseCookie cookie = ResponseCookie.from("accessToken", token.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new GeneralResponse<>(sellerDto));
    }

    @GetMapping("/oauth2/facebook")
    public ResponseEntity<GeneralResponse<SellerDto>> createFacebookSeller(@RequestParam("code") String code) {
        String accessToken = oAuth2Service.getOauthAccessTokenFacebook(code, "seller");
        SellerForm sellerForm = oAuth2Service.getSellerFormFacebook(accessToken);

        TokenDto token = new TokenDto();
        SellerDto sellerDto = sellerFacade.createOrLoginFromOAuth(sellerForm, token);
        ResponseCookie cookie = ResponseCookie.from("accessToken", token.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new GeneralResponse<>(sellerDto));
    }

    @GetMapping("/oauth2/github")
    public ResponseEntity<GeneralResponse<SellerDto>> createGithubSeller(@RequestParam("code") String code) {
        String accessToken = oAuth2Service.getOauthAccessTokenGithub(code, "sellers");
        SellerForm sellerForm = oAuth2Service.getSellerFormGithub(accessToken);

        TokenDto token = new TokenDto();
        SellerDto sellerDto = sellerFacade.createOrLoginFromOAuth(sellerForm, token);
        ResponseCookie cookie = ResponseCookie.from("accessToken", token.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new GeneralResponse<>(sellerDto));
    }
}
