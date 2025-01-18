package fer.portane.service;

import fer.portane.model.Seller;

public interface SellerService {
    Seller save(Seller seller);
    Seller findById(Long id);
    Seller findByUserId(Long userId);
    Seller findByName(String name);
}
