package fer.portane.facade;

import fer.portane.dto.StorageDto;
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface StorageFacade {
    StorageDto upload(MultipartFile file) throws IOException;
}
