package fer.portane.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class GeneralResponse<T> {
    private T result;

    private List<String> errors = new ArrayList<>();

    public GeneralResponse(T result) {
        this.result = result;
    }
}
