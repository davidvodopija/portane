package fer.portane.facade;

import fer.portane.dto.TokenDto;
import fer.portane.dto.UserDto;
import fer.portane.form.LoginForm;
import fer.portane.form.UserForm;
import org.antlr.v4.runtime.Token;

public interface UserFacade {
    UserDto create(UserForm userForm, TokenDto token);

    UserDto authenticate(LoginForm loginForm, TokenDto token);
}
