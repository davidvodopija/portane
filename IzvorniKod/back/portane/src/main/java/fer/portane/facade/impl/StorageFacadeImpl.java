package fer.portane.facade.impl;

import fer.portane.dto.StorageDto;
import fer.portane.facade.StorageFacade;
import fer.portane.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class StorageFacadeImpl implements StorageFacade {
    @Autowired
    private StorageService storageService;

    @Override
    public StorageDto upload(MultipartFile file) {
        try {
            return StorageDto.builder()
                    .link(storageService.upload("images", file.getOriginalFilename(), file))
                    .build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
