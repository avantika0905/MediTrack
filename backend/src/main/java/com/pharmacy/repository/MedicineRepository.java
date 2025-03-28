package com.pharmacy.repository;

import com.pharmacy.model.Medicine;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface MedicineRepository extends MongoRepository<Medicine, String> {
    List<Medicine> findByCategory(String category);
    List<Medicine> findByNameContainingIgnoreCase(String name);
    List<Medicine> findByBrandContainingIgnoreCase(String brand);
    List<Medicine> findByCreatedBy(String userId);
}