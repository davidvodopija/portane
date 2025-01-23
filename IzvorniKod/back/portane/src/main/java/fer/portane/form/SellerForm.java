package fer.portane.form;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SellerForm {
    private String name;
    private String logo;
    private String email;
    private String password;
}
