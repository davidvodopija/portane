package fer.portane.service;

import fer.portane.model.Gallery;
import fer.portane.model.Seller;
import fer.portane.repository.GalleryRepository;
import fer.portane.service.GalleryService;
import fer.portane.service.impl.GalleryServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GalleryServiceTest {

    @Mock
    private GalleryRepository galleryRepository;

    @InjectMocks
    private GalleryServiceImpl galleryService; // Replace with your actual service class name

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindById_withExistingId() {
        Long galleryId = 1L;
        Gallery gallery = new Gallery();
        gallery.setId(galleryId);
        gallery.setName("Sample Gallery");

        when(galleryRepository.findById(galleryId)).thenReturn(Optional.of(gallery));

        Gallery result = galleryService.findById(galleryId);

        assertNotNull(result);
        assertEquals(galleryId, result.getId());
        assertEquals("Sample Gallery", result.getName());

        verify(galleryRepository, times(1)).findById(galleryId);
    }

    @Test
    void testFindById_withNonExistingId() {
        Long galleryId = 1L;
        when(galleryRepository.findById(galleryId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> galleryService.findById(galleryId));
        assertEquals("Gallery with id 1 not found.", exception.getMessage());

        verify(galleryRepository, times(1)).findById(galleryId);
    }

    @Test
    void testFindAllBySellerId_withExistingSellerId() {
        Long sellerId = 10L;
        Seller seller = new Seller();
        seller.setId(sellerId);
        PageRequest pageRequest = PageRequest.of(0, 5);

        Gallery gallery1 = new Gallery();
        gallery1.setId(1L);
        gallery1.setName("Gallery 1");
        gallery1.setSeller(seller);

        Gallery gallery2 = new Gallery();
        gallery2.setId(2L);
        gallery2.setName("Gallery 2");
        gallery2.setSeller(seller);

        Page<Gallery> page = new PageImpl<>(List.of(gallery1, gallery2));

        when(galleryRepository.findAllBySellerId(sellerId, pageRequest)).thenReturn(page);

        Page<Gallery> result = galleryService.findAllBySellerId(sellerId, pageRequest);

        assertNotNull(result);
        assertEquals(2, result.getTotalElements());
        assertEquals("Gallery 1", result.getContent().get(0).getName());
        assertEquals("Gallery 2", result.getContent().get(1).getName());

        verify(galleryRepository, times(1)).findAllBySellerId(sellerId, pageRequest);
    }

    @Test
    void testFindAllBySellerId_withNoGalleries() {
        Long sellerId = 10L;
        PageRequest pageRequest = PageRequest.of(0, 5);

        when(galleryRepository.findAllBySellerId(sellerId, pageRequest)).thenReturn(Page.empty());

        Page<Gallery> result = galleryService.findAllBySellerId(sellerId, pageRequest);

        assertNotNull(result);
        assertEquals(0, result.getTotalElements());
        assertTrue(result.getContent().isEmpty());

        verify(galleryRepository, times(1)).findAllBySellerId(sellerId, pageRequest);
    }
}
