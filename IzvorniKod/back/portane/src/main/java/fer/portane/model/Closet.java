package fer.portane.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "closets")
public class Closet extends BaseEntity {
    private String title;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "closet", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<ClosetCustomComponent> components;
}
