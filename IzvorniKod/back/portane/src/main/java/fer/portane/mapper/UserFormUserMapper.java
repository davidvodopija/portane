package fer.portane.mapper;

import fer.portane.form.UserForm;
import fer.portane.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserFormUserMapper {
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User toUser(UserForm userForm) {
        User user = new User();
        user.setEmail(userForm.getEmail());
        user.setPassword(passwordEncoder.encode(userForm.getPassword()));
        user.setFirstname(userForm.getFirstname());
        user.setLastname(userForm.getLastname());
        return user;
    }
}
