package fer.portane.model.lut;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(schema = "lut", name = "colors")
public class Color extends LutBase {
    private String hex;
}
