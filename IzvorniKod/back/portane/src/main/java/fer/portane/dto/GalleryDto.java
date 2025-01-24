package fer.portane.dto;

import lombok.Data;

@Data
public class GalleryDto {
    private Long id;
    private SellerDto sellerDto;
    private String name;
    private Integer adsCount;
}
