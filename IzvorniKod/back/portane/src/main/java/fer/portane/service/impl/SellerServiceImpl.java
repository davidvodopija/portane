package fer.portane.service.impl;

import fer.portane.model.Seller;
import fer.portane.repository.SellerRepository;
import fer.portane.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellerServiceImpl implements SellerService {
    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public Seller save(Seller seller) {
        return sellerRepository.save(seller);
    }

    @Override
    public Seller findById(Long id) {
        return sellerRepository.findById(id).orElseThrow(() -> new RuntimeException("Seller with id = " + id + " not found"));
    }

    @Override
    public Seller findByUserId(Long userId) {
        return sellerRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Seller with user id = " + userId + " not found"));
    }

    @Override
    public Seller findByName(String name) {
        return sellerRepository.findByName(name).orElseThrow(() -> new RuntimeException("Seller with name = " + name + " not found"));
    }
}
