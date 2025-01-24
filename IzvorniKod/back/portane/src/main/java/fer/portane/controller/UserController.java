package fer.portane.controller;

import fer.portane.dto.TokenDto;
import fer.portane.dto.UserDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.facade.UserFacade;
import fer.portane.form.UserForm;
import fer.portane.service.OAuth2Service;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.*;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserFacade userFacade;

    @Autowired
    private OAuth2Service oAuth2Service;

    @PostMapping("/create")
    public ResponseEntity<GeneralResponse<UserDto>> create(
            @Valid @RequestBody UserForm userForm,
            BindingResult bindingResult) {
        GeneralResponse<UserDto> generalResponse = new GeneralResponse<>();

        if (bindingResult.hasErrors()) {
            generalResponse.setErrors(
                    bindingResult.getAllErrors()
                    .stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .toList());
            return ResponseEntity.badRequest().body(generalResponse);
        }

        TokenDto token = new TokenDto();
        UserDto userDto = userFacade.create(userForm, token);
        generalResponse.setResult(userDto);

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
    public ResponseEntity<GeneralResponse<UserDto>> createGoogleUser(@RequestParam("code") String code) {
        String accessToken = oAuth2Service.getOauthAccessTokenGoogle(code, "users");
        UserForm userForm = oAuth2Service.getUserFormGoogle(accessToken);

        TokenDto token = new TokenDto();
        UserDto userDto = userFacade.createOrLoginFromOAuth(userForm, token);
        ResponseCookie cookie = ResponseCookie.from("accessToken", token.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new GeneralResponse<>(userDto));
    }

    @GetMapping("/oauth2/facebook")
    public ResponseEntity<GeneralResponse<UserDto>> createFacebookUser(@RequestParam("code") String code) {
        String accessToken = oAuth2Service.getOauthAccessTokenFacebook(code, "users");
        UserForm userForm = oAuth2Service.getUserFormFacebook(accessToken);

        TokenDto token = new TokenDto();
        UserDto userDto = userFacade.createOrLoginFromOAuth(userForm, token);
        ResponseCookie cookie = ResponseCookie.from("accessToken", token.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new GeneralResponse<>(userDto));
    }

    @GetMapping("/oauth2/github")
    public ResponseEntity<GeneralResponse<UserDto>> createGithubUser(@RequestParam("code") String code) {
        String accessToken = oAuth2Service.getOauthAccessTokenGithub(code, "users");
        UserForm userForm = oAuth2Service.getUserFormGithub(accessToken);

        TokenDto token = new TokenDto();
        UserDto userDto = userFacade.createOrLoginFromOAuth(userForm, token);
        ResponseCookie cookie = ResponseCookie.from("accessToken", token.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new GeneralResponse<>(userDto));
    }
}
