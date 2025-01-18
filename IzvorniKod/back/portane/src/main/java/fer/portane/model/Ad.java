package fer.portane.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "ads")
@Data
public class Ad extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;
    @ManyToOne
    @JoinColumn(name = "gallery_id")
    private Gallery gallery;
    private Double price;
}
