package fer.portane.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserForm {
    private String email;
    private String password;
    private String firstname;
    private String lastname;
}
