package com.pharmacy.repository;

import com.pharmacy.model.Medicine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface MedicineRepository extends MongoRepository<Medicine, String> {
    Optional<Medicine> findByName(String name);
    List<Medicine> findByBrand(String brand);
    List<Medicine> findByPriceBetween(double minPrice, double maxPrice);
}
