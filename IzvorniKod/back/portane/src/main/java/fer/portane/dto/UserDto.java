package fer.portane.dto;

import lombok.Data;

@Data
public class UserDto {
    private String email;
    private String firstname;
    private String lastname;
    private boolean isSeller;
}
