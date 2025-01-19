package fer.portane.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String email;
    private String firstname;
    private String lastname;
    private SellerDto seller;
}
