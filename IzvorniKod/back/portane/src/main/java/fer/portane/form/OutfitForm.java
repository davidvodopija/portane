package fer.portane.form;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class OutfitForm {
    private List<Long> categoryIds;
    private Long colorId;
    private LocalDate date;
    private Long styleId;
}
