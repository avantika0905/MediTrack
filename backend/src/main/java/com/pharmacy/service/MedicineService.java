package com.pharmacy.service;

import com.pharmacy.model.Medicine;
import com.pharmacy.repository.MedicineRepository;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MedicineService {
    private static final Logger logger = LoggerFactory.getLogger(MedicineService.class);
    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
    }

    public List<Medicine> getAllMedicines() {
        logger.info("Fetching all medicines...");
        return medicineRepository.findAll();
    }

    public Medicine getMedicineById(String id) {
        logger.info("Fetching medicine with ID: {}", id);
        return medicineRepository.findById(id)
                .orElseThrow(() -> {
                    logger.error("Medicine not found with ID: {}", id);
                    return new ResponseStatusException(HttpStatus.NOT_FOUND, "Medicine not found");
                });
    }

    public Medicine createMedicine(@Valid Medicine medicine) {
        logger.info("Creating medicine: {}", medicine);
        if (medicineRepository.findByName(medicine.getName()).isPresent()) {
            logger.error("Medicine with name '{}' already exists", medicine.getName());
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Medicine with this name already exists");
        }

        try {
            return medicineRepository.save(medicine);
        } catch (Exception e) {
            logger.error("Error saving medicine: {}", e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error saving medicine");
        }
    }

    public Medicine updateMedicine(String id, @Valid Medicine medicine) {
        logger.info("Updating medicine with ID: {}", id);
        Medicine existingMedicine = medicineRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Medicine not found"));

        existingMedicine.setName(medicine.getName());
        existingMedicine.setBrand(medicine.getBrand());
        existingMedicine.setPrice(medicine.getPrice());
        existingMedicine.setStock(medicine.getStock());
        // Optionally update other fields like description, imageUrl, and category if needed

        return medicineRepository.save(existingMedicine);
    }

    public void deleteMedicine(String id) {
        logger.info("Deleting medicine with ID: {}", id);
        if (!medicineRepository.existsById(id)) {
            logger.error("Medicine not found with ID: {}", id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Medicine not found");
        }
        medicineRepository.deleteById(id);
    }
}
