package fer.portane.repository;

import fer.portane.model.lut.LutBase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface LutRepository<T extends LutBase> extends JpaRepository<T, Long> {
    T findByName(String name);
}
