package fer.portane.model;

import fer.portane.model.lut.*;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "articles")
@Data
public class Article extends BaseEntity {
    private String label;
    private String picture;
    @Column(name = "public")
    private boolean isPublic;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "condition_id")
    private Condition condition;

    @ManyToOne
    @JoinColumn(name = "footwear_type_id")
    private FootwearType footwearType;

    @ManyToOne
    @JoinColumn(name = "primary_color_id")
    private Color primaryColor;

    @ManyToOne
    @JoinColumn(name = "secondary_color_id")
    private Color secondaryColor;

    @ManyToMany
    @JoinTable(
            name = "articles_seasons",
            joinColumns = @JoinColumn(name = "articles_id"),
            inverseJoinColumns = @JoinColumn(name = "seasons_id")
    )
    private List<Season> seasons;

    @ManyToMany
    @JoinTable(
            name = "articles_styles",
            joinColumns = @JoinColumn(name = "articles_id"),
            inverseJoinColumns = @JoinColumn(name = "styles_id")
    )
    private List<Style> styles;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "closet_custom_component_id")
    private ClosetCustomComponent closetCustomComponent;
}
