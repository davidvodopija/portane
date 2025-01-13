package fer.portane.controller;

import fer.portane.dto.GeneralResponse;
import fer.portane.dto.LutDto;
import fer.portane.mapper.LutDtoMapper;
import fer.portane.model.lut.LutBase;
import fer.portane.service.LutService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Transactional
public class LutController<T extends LutBase> {
    @Autowired
    LutDtoMapper<T> lutDtoMapper;
    @Autowired
    private LutService<T> lutService;
    @GetMapping("/all")
    public ResponseEntity<GeneralResponse<List<LutDto>>> findAll() {
        return ResponseEntity.ok(new GeneralResponse<>(
                lutService.findAll()
                        .stream()
                        .map(lutDtoMapper::toDto)
                        .toList()));
    }
}
