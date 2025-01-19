package fer.portane.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "sellers")
@Data
public class Seller extends BaseEntity{
    private String name;
    private String logo;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "seller")
    private List<Gallery> galleries = new ArrayList<>();
}
