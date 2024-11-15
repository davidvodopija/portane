package fer.portane.controller;

import fer.portane.dto.TokenDto;
import fer.portane.dto.UserDto;
import fer.portane.dto.GeneralResponse;
import fer.portane.facade.UserFacade;
import fer.portane.form.UserForm;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserFacade userFacade;

    @PostMapping("/create")
    private ResponseEntity<GeneralResponse<UserDto>> create(
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

    @GetMapping("/test")
    private ResponseEntity<String> test() {
        return new ResponseEntity<>("Radi", HttpStatus.OK);
    }
}
