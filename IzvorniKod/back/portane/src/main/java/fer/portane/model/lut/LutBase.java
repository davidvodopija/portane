package fer.portane.model.lut;

import jakarta.persistence.*;
import lombok.Data;

@MappedSuperclass
@Data
public class LutBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
}
