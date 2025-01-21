package fer.portane.form;

import lombok.Data;

import java.util.List;

@Data
public class ClosetForm {
    private Long id;
    private String title;
    private List<ClosetComponentForm> componentsList;
    private Double latitude;
    private Double longitude;
}
