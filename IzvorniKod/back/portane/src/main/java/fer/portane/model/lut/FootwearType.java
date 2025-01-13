package fer.portane.model.lut;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(schema = "lut", name = "footwear_types")
public class FootwearType extends LutBase {
}
