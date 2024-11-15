package fer.portane.error;

import fer.portane.dto.GeneralResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;

@ControllerAdvice
@Slf4j
public class ControllerErrorHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<GeneralResponse<Void>> handleRuntimeException(RuntimeException e) {
        log.error("An error occurred: ", e);
        GeneralResponse<Void> generalResponse = new GeneralResponse<>();

        ArrayList<String> errors = new ArrayList<>();
        errors.add(e.getMessage());
        generalResponse.setErrors(errors);

        return ResponseEntity.internalServerError().body(generalResponse);
    }
}
