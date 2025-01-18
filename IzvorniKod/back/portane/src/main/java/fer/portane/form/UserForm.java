package fer.portane.form;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserForm {
    private String email;
    private String password;
    private String firstname;
    private String lastname;
}
