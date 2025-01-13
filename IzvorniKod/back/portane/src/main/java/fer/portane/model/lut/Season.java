package fer.portane.model.lut;

import fer.portane.model.Article;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(schema = "lut", name = "seasons")
@Data
public class Season extends LutBase {
    @ManyToMany(mappedBy = "seasons")
    private List<Article> articles;
}