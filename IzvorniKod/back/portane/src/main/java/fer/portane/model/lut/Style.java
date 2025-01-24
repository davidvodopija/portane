package fer.portane.model.lut;

import fer.portane.model.Article;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(schema = "lut", name = "styles")
@Data
public class Style extends LutBase {
    @ManyToMany(mappedBy = "styles")
    private List<Article> articles;
}
