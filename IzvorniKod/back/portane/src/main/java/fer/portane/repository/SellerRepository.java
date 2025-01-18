package fer.portane.repository;

import fer.portane.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    Optional<Seller> findByUserId(Long userId);
    Optional<Seller> findByName(String name);
}
