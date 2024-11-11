package fer.portane.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class GeneralResponse<T> {
    private T result;

    private List<String> errors = new ArrayList<>();
}
