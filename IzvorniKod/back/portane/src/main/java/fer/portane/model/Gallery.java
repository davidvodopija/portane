package fer.portane.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "galleries")
@Data
public class Gallery extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "id")
    private Seller seller;
    private String name;

    @OneToMany(mappedBy = "gallery", fetch = FetchType.LAZY)
    private List<Ad> ads = new ArrayList<>();
}
