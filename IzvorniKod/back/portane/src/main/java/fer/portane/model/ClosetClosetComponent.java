package fer.portane.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "closet_closet_components")
public class ClosetClosetComponent extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "closet_id")
    private Closet closet;

    @ManyToOne
    @JoinColumn(name = "closet_component_id")
    private ClosetComponent closetComponent;

    private Integer quantity;
}
