package fer.portane.mapper;

import fer.portane.dto.SellerDto;
import fer.portane.model.Seller;

public class SellerSellerDtoMapper {
    public static SellerDto toDto(Seller seller) {
        SellerDto sellerDto = new SellerDto();
        sellerDto.setId(seller.getId());
        sellerDto.setName(seller.getName());
        sellerDto.setLogo(seller.getLogo());
        sellerDto.setEmail(seller.getUser().getEmail());
        return sellerDto;
    }
}
