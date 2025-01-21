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

    private Double latitude;

    private Double longitude;

    @OneToMany(mappedBy = "closet", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ClosetCustomComponent> components;
}
