package fer.portane.facade;

import fer.portane.dto.TokenDto;
import fer.portane.dto.UserDto;
import fer.portane.facade.impl.UserFacadeImpl;
import fer.portane.form.UserForm;
import fer.portane.mapper.UserFormUserMapper;
import fer.portane.mapper.UserUserDtoMapper;
import fer.portane.model.User;
import fer.portane.service.JwtService;
import fer.portane.service.UserService;
import fer.portane.service.UserTokenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class UserFacadeTest {

    @InjectMocks
    private UserFacadeImpl userFacade;

    @Mock
    private UserService userService;

    @Mock
    private UserFormUserMapper userFormMapper;

    @Mock
    private UserUserDtoMapper userUserDtoMapper;

    @Mock
    private JwtService jwtService;

    @Mock
    private UserTokenService userTokenService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUserSuccessfully() {
        // Arrange
        UserForm userForm = new UserForm();
        userForm.setEmail("test@example.com");
        userForm.setPassword("aBcD$1234");
        userForm.setFirstname("John");
        userForm.setLastname("Doe");

        User mockUser = new User();
        mockUser.setEmail(userForm.getEmail());

        UserDto userDto = new UserDto();
        userDto.setEmail(userForm.getEmail());

        TokenDto token = new TokenDto();
        token.setAccessToken("sampleAccessToken");

        when(userService.getUserByEmail(userForm.getEmail())).thenReturn(Optional.empty());
        when(userFormMapper.toUser(userForm)).thenReturn(mockUser);
        when(userService.save(mockUser)).thenReturn(mockUser);
        when(jwtService.generateTokens(any(String.class))).thenReturn(token);

        UserDto result = userFacade.create(userForm, token);

        assertNotNull(result);
        assertEquals(userForm.getEmail(), result.getEmail());
        assertNotNull(token.getAccessToken());

        verify(userService, times(1)).getUserByEmail(userForm.getEmail());
        verify(userFormMapper, times(1)).toUser(userForm);
        verify(userService, times(1)).save(mockUser);
    }

    @Test
    void testCreateUserAlreadyExists() {
        UserForm userForm = new UserForm();
        userForm.setEmail("existing@example.com");

        when(userService.getUserByEmail(userForm.getEmail())).thenReturn(Optional.of(new User()));

        TokenDto token = new TokenDto();

        RuntimeException exception = assertThrows(RuntimeException.class, () -> userFacade.create(userForm, token));
        assertEquals("User already exists.", exception.getMessage());

        verify(userService, times(1)).getUserByEmail(userForm.getEmail());
        verifyNoInteractions(userFormMapper, userUserDtoMapper);
    }
}
