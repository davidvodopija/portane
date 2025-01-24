package fer.portane.facade.impl;

import fer.portane.dto.TokenDto;
import fer.portane.dto.UserDto;
import fer.portane.exception.NotFound;
import fer.portane.facade.UserFacade;
import fer.portane.form.LoginForm;
import fer.portane.form.UserForm;
import fer.portane.mapper.UserFormUserMapper;
import fer.portane.mapper.UserUserDtoMapper;
import fer.portane.model.User;
import fer.portane.model.UserToken;
import fer.portane.service.AuthService;
import fer.portane.service.JwtService;
import fer.portane.service.UserService;
import fer.portane.service.UserTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserFacadeImpl implements UserFacade {
    @Autowired
    private UserFormUserMapper userFormMapper;
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserTokenService userTokenService;

    @Autowired
    private AuthService authService;

    @Override
    public UserDto create(UserForm userForm, TokenDto token) {
        if (userService.getUserByEmail(userForm.getEmail()).isPresent())
            throw new RuntimeException("User already exists.");
        // save entity
        User user = userService.save(userFormMapper.toUser(userForm));

        TokenDto t = createTokens(user);
        token.setAccessToken(t.getAccessToken());
        token.setRefreshToken(t.getRefreshToken());
        return UserUserDtoMapper.toUserDto(user);
    }

    @Override
    public UserDto createOrLoginFromOAuth(UserForm userForm, TokenDto token) {
        User user = userService.getUserByEmail(userForm.getEmail())
                .orElse(null);
        if (user != null) {
            TokenDto t = createTokens(user);
            token.setAccessToken(t.getAccessToken());
            return UserUserDtoMapper.toUserDto(user);
        }

        user = userService.save(userFormMapper.toUser(userForm));
        TokenDto t = createTokens(user);
        token.setAccessToken(t.getAccessToken());
        return UserUserDtoMapper.toUserDto(user);
    }

    @Override
    public UserDto authenticate(LoginForm loginForm, TokenDto token) {
        User user = userService.getUserByEmail(loginForm.getEmail())
                .orElse(null);

        if (user == null)
            throw new NotFound("User not found.");

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginForm.getEmail(),
                        loginForm.getPassword())
        );

        TokenDto t = createTokens(user);
        token.setAccessToken(t.getAccessToken());
        token.setRefreshToken(t.getRefreshToken());
        return UserUserDtoMapper.toUserDto(user);
    }
    
    @Override
    public TokenDto createTokens(User user) {
        TokenDto tokenDto = jwtService.generateTokens(user.getEmail());
        UserToken userToken = new UserToken();
        userToken.setAccessToken(tokenDto.getAccessToken());
        userToken.setRefreshToken(tokenDto.getRefreshToken());
        userToken.setUser(user);

        userTokenService.deleteAllFromUser(user.getId());
        userTokenService.save(userToken);
        return tokenDto;
    }
}
