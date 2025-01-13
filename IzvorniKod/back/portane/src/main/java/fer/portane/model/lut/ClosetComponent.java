package fer.portane.model.lut;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(schema = "lut", name = "closet_components")
public class ClosetComponent {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    private String label;
}
