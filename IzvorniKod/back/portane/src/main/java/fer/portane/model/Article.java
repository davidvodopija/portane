package fer.portane.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "articles")
@Data
public class Article extends BaseEntity {
    public String title;
    public String picture;
    public boolean isPublic;

}
