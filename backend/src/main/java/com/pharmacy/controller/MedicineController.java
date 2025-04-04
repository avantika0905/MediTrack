// package com.pharmacy.controller;

// import com.pharmacy.dto.MedicineDto;
// import com.pharmacy.service.MedicineService;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/medicines")
// public class MedicineController {
//     private static final Logger logger = LoggerFactory.getLogger(MedicineController.class);
//     private final MedicineService medicineService;

//     public MedicineController(MedicineService medicineService) {
//         this.medicineService = medicineService;
//     }

//     @GetMapping
//     public ResponseEntity<List<MedicineDto.MedicineResponse>> getAllMedicines() {
//         logger.info("Fetching all medicines");
//         return ResponseEntity.ok(medicineService.getAllMedicines());
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<MedicineDto.MedicineResponse> getMedicineById(@PathVariable String id) {
//         logger.info("Fetching medicine with id: {}", id);
//         return ResponseEntity.ok(medicineService.getMedicineById(id));
//     }

//     @PostMapping
//     public ResponseEntity<MedicineDto.MedicineResponse> createMedicine(@RequestBody MedicineDto.MedicineRequest request) {
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String currentUserEmail = authentication.getName();
        
//         logger.info("Creating new medicine: {} by user: {}", request.getName(), currentUserEmail);
//         return ResponseEntity.ok(medicineService.createMedicine(request, currentUserEmail));
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<MedicineDto.MedicineResponse> updateMedicine(
//             @PathVariable String id,
//             @RequestBody MedicineDto.MedicineRequest request) {
//         logger.info("Updating medicine with id: {}", id);
//         return ResponseEntity.ok(medicineService.updateMedicine(id, request));
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deleteMedicine(@PathVariable String id) {
//         logger.info("Deleting medicine with id: {}", id);
//         medicineService.deleteMedicine(id);
//         return ResponseEntity.noContent().build();
//     }

//     @GetMapping("/search")
//     public ResponseEntity<List<MedicineDto.MedicineResponse>> searchMedicines(@RequestParam String query) {
//         logger.info("Searching medicines with query: {}", query);
//         return ResponseEntity.ok(medicineService.searchMedicines(query));
//     }

//     @GetMapping("/category/{category}")
//     public ResponseEntity<List<MedicineDto.MedicineResponse>> getMedicinesByCategory(@PathVariable String category) {
//         logger.info("Fetching medicines by category: {}", category);
//         return ResponseEntity.ok(medicineService.getMedicinesByCategory(category));
//     }

//     @GetMapping("/user")
//     public ResponseEntity<List<MedicineDto.MedicineResponse>> getUserMedicines() {
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String currentUserEmail = authentication.getName();
        
//         logger.info("Fetching medicines created by user: {}", currentUserEmail);
//         return ResponseEntity.ok(medicineService.getMedicinesByUser(currentUserEmail));
//     }
// }













package com.pharmacy.controller;

import com.pharmacy.dto.MedicineDto;
import com.pharmacy.service.CloudinaryService;
import com.pharmacy.service.MedicineService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
public class MedicineController {
    private static final Logger logger = LoggerFactory.getLogger(MedicineController.class);
    private final MedicineService medicineService;
    private final CloudinaryService cloudinaryService;

    public MedicineController(MedicineService medicineService, CloudinaryService cloudinaryService) {
        this.medicineService = medicineService;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping
    public ResponseEntity<List<MedicineDto.MedicineResponse>> getAllMedicines() {
        logger.info("Fetching all medicines");
        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicineDto.MedicineResponse> getMedicineById(@PathVariable String id) {
        logger.info("Fetching medicine with id: {}", id);
        return ResponseEntity.ok(medicineService.getMedicineById(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MedicineDto.MedicineResponse> createMedicine(@RequestBody MedicineDto.MedicineRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        
        logger.info("Creating new medicine: {} by user: {}", request.getName(), currentUserEmail);
        return ResponseEntity.ok(medicineService.createMedicine(request, currentUserEmail));
    }

    @PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MedicineDto.MedicineResponse> updateMedicine(
            @PathVariable String id,
            @RequestBody MedicineDto.MedicineRequest request) {
        logger.info("Updating medicine with id: {}", id);
        return ResponseEntity.ok(medicineService.updateMedicine(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicine(@PathVariable String id) {
        logger.info("Deleting medicine with id: {}", id);
        medicineService.deleteMedicine(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<MedicineDto.MedicineResponse>> searchMedicines(@RequestParam String query) {
        logger.info("Searching medicines with query: {}", query);
        return ResponseEntity.ok(medicineService.searchMedicines(query));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<MedicineDto.MedicineResponse>> getMedicinesByCategory(@PathVariable String category) {
        logger.info("Fetching medicines by category: {}", category);
        return ResponseEntity.ok(medicineService.getMedicinesByCategory(category));
    }

    @GetMapping("/user")
    public ResponseEntity<List<MedicineDto.MedicineResponse>> getUserMedicines() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserEmail = authentication.getName();
        
        logger.info("Fetching medicines created by user: {}", currentUserEmail);
        return ResponseEntity.ok(medicineService.getMedicinesByUser(currentUserEmail));
    }
}

