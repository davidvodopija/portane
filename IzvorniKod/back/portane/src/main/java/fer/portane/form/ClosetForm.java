package fer.portane.form;

import lombok.Data;

import java.util.List;

@Data
public class ClosetForm {
    private String title;
    private List<ClosetComponentForm> componentsList;
}
