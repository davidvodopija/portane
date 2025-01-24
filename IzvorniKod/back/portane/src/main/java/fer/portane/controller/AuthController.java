package fer.portane.controller;

import fer.portane.dto.GeneralResponse;
import fer.portane.dto.TokenDto;
import fer.portane.dto.UserDto;
import fer.portane.facade.AuthFacade;
import fer.portane.facade.UserFacade;
import fer.portane.form.LoginForm;
import fer.portane.service.OAuth2Service;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserFacade userFacade;

    @Autowired
    private AuthFacade authFacade;

    @Autowired
    private OAuth2Service oAuth2Service;

    @PostMapping("/login")
    public ResponseEntity<GeneralResponse<UserDto>> login(
            @Valid @RequestBody LoginForm loginForm,
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
        UserDto userDto = userFacade.authenticate(loginForm, token);
        generalResponse.setResult(userDto);

        ResponseCookie cookie = ResponseCookie.from("accessToken", token.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(generalResponse);
    }

    @GetMapping("/logout")
    public ResponseEntity<GeneralResponse<String>> logout(HttpServletResponse response) {
        GeneralResponse<String> generalResponse = new GeneralResponse<>();

        ResponseCookie cookie = ResponseCookie.from("accessToken", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();

        authFacade.logout();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        generalResponse.setResult("Logged out successfully");
        return ResponseEntity.ok(generalResponse);
    }

}
