package fer.portane.controller;

import fer.portane.dto.GeneralResponse;
import fer.portane.dto.StorageDto;
import fer.portane.facade.StorageFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/storage")
public class StorageController {
    @Autowired
    private StorageFacade storageFacade;

    @PostMapping(path = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<GeneralResponse<StorageDto>> upload(
            @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(new GeneralResponse<>(storageFacade.upload(file)));
    }
}
