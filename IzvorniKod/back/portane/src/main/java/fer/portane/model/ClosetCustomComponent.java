package fer.portane.model;

import fer.portane.model.lut.ClosetComponent;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "closet_closet_components")
public class ClosetCustomComponent extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "closet_id")
    private Closet closet;

    @ManyToOne
    @JoinColumn(name = "closet_component_id")
    private ClosetComponent closetComponent;

    @OneToMany(mappedBy = "closetCustomComponent")
    private List<Article> articles;

    private String title;
}
