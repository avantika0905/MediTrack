package com.pharmacy.controller;

import com.pharmacy.model.Medicine;
import com.pharmacy.service.MedicineService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {
    private static final Logger logger = LoggerFactory.getLogger(MedicineController.class);
    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines() {
        logger.info("API Call: GET /api/medicines");
        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(@PathVariable String id) {
        logger.info("API Call: GET /api/medicines/{}", id);
        return ResponseEntity.ok(medicineService.getMedicineById(id));
    }

    @PostMapping
    public ResponseEntity<Medicine> createMedicine(@Valid @RequestBody Medicine medicine) {
        logger.info("API Call: POST /api/medicines");
        return ResponseEntity.status(201).body(medicineService.createMedicine(medicine));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable String id, @Valid @RequestBody Medicine medicine) {
        logger.info("API Call: PUT /api/medicines/{}", id);
        return ResponseEntity.ok(medicineService.updateMedicine(id, medicine));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedicine(@PathVariable String id) {
        logger.info("API Call: DELETE /api/medicines/{}", id);
        medicineService.deleteMedicine(id);
        return ResponseEntity.ok("Medicine deleted successfully");
    }
}
