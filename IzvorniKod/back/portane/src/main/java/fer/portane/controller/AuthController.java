package fer.portane.controller;

import fer.portane.dto.TokenDto;
import fer.portane.dto.UserDto;
import fer.portane.facade.UserFacade;
import fer.portane.form.LoginForm;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserFacade userFacade;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@Valid @RequestBody LoginForm loginForm) {
        TokenDto token = new TokenDto();
        UserDto userDto = userFacade.authenticate(loginForm, token);

        ResponseCookie cookie = ResponseCookie.from("accessToken", token.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();


        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(userDto);
    }
}
