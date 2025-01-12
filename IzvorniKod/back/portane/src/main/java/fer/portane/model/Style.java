package fer.portane.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "lut.styles")
@Data
public class Style {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}
