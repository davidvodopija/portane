package fer.portane.model.lut;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(schema = "lut", name = "conditions")
public class Condition extends LutBase {
}