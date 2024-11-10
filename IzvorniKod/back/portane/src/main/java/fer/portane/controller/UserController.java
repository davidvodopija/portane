package fer.portane.controller;

import fer.portane.dto.TokenDto;
import fer.portane.dto.UserDto;
import fer.portane.facade.UserFacade;
import fer.portane.form.UserForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserFacade userFacade;

    @PostMapping("/create")
    private ResponseEntity<UserDto> create(@RequestBody UserForm userForm) {
        TokenDto token = new TokenDto();
        UserDto userDto = userFacade.create(userForm, token);

        ResponseCookie cookie = ResponseCookie.from("accessToken", token.getAccessToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(60 * 60 * 24)
                .build();


        return ResponseEntity.created(null)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(userDto);
    }

    @GetMapping("/test")
    private ResponseEntity<String> test() {
        return new ResponseEntity<>("Radi", HttpStatus.OK);
    }
}
