package fer.portane.model.lut;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(schema = "lut", name = "closet_components")
public class ClosetComponent extends LutBase {
}
