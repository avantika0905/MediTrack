// package com.pharmacy.service;

// import com.pharmacy.dto.MedicineDto;
// import com.pharmacy.model.Medicine;
// import com.pharmacy.repository.MedicineRepository;
// import org.springframework.stereotype.Service;
// import java.util.List;
// import java.util.stream.Collectors;

// @Service
// public class MedicineService {
//     private final MedicineRepository medicineRepository;

//     public MedicineService(MedicineRepository medicineRepository) {
//         this.medicineRepository = medicineRepository;
//     }

//     public List<MedicineDto.MedicineResponse> getAllMedicines() {
//         return medicineRepository.findAll().stream()
//                 .map(this::convertToDto)
//                 .collect(Collectors.toList());
//     }

//     public MedicineDto.MedicineResponse getMedicineById(String id) {
//         Medicine medicine = medicineRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
//         return convertToDto(medicine);
//     }

//     public MedicineDto.MedicineResponse createMedicine(MedicineDto.MedicineRequest request, String userId) {
//         Medicine medicine = new Medicine();
//         medicine.setName(request.getName());
//         medicine.setBrand(request.getBrand());
//         medicine.setPrice(request.getPrice());
//         medicine.setStock(request.getStock());
//         medicine.setDescription(request.getDescription());
//         medicine.setImage(request.getImage());
//         medicine.setCategory(request.getCategory());
//         medicine.setCreatedBy(userId);

//         Medicine savedMedicine = medicineRepository.save(medicine);
//         return convertToDto(savedMedicine);
//     }

//     public MedicineDto.MedicineResponse updateMedicine(String id, MedicineDto.MedicineRequest request) {
//         Medicine medicine = medicineRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));

//         medicine.setName(request.getName());
//         medicine.setBrand(request.getBrand());
//         medicine.setPrice(request.getPrice());
//         medicine.setStock(request.getStock());
//         medicine.setDescription(request.getDescription());
//         medicine.setImage(request.getImage());
//         medicine.setCategory(request.getCategory());

//         Medicine updatedMedicine = medicineRepository.save(medicine);
//         return convertToDto(updatedMedicine);
//     }

//     public void deleteMedicine(String id) {
//         if (!medicineRepository.existsById(id)) {
//             throw new RuntimeException("Medicine not found with id: " + id);
//         }
//         medicineRepository.deleteById(id);
//     }

//     public List<MedicineDto.MedicineResponse> searchMedicines(String query) {
//         List<Medicine> nameResults = medicineRepository.findByNameContainingIgnoreCase(query);
//         List<Medicine> brandResults = medicineRepository.findByBrandContainingIgnoreCase(query);
        
//         // Combine results and remove duplicates
//         return nameResults.stream()
//                 .filter(medicine -> !brandResults.contains(medicine))
//                 .collect(Collectors.toList())
//                 .stream()
//                 .map(this::convertToDto)
//                 .collect(Collectors.toList());
//     }

//     public List<MedicineDto.MedicineResponse> getMedicinesByCategory(String category) {
//         return medicineRepository.findByCategory(category).stream()
//                 .map(this::convertToDto)
//                 .collect(Collectors.toList());
//     }

//     public List<MedicineDto.MedicineResponse> getMedicinesByUser(String userId) {
//         return medicineRepository.findByCreatedBy(userId).stream()
//                 .map(this::convertToDto)
//                 .collect(Collectors.toList());
//     }

//     private MedicineDto.MedicineResponse convertToDto(Medicine medicine) {
//         return new MedicineDto.MedicineResponse(
//                 medicine.getId(),
//                 medicine.getName(),
//                 medicine.getBrand(),
//                 medicine.getPrice(),
//                 medicine.getStock(),
//                 medicine.getDescription(),
//                 medicine.getImage(),
//                 medicine.getCategory()
//         );
//     }
// }

















package com.pharmacy.service;

import com.pharmacy.dto.MedicineDto;
import com.pharmacy.model.Medicine;
import com.pharmacy.repository.MedicineRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicineService {
    private static final Logger logger = LoggerFactory.getLogger(MedicineService.class);
    
    private final MedicineRepository medicineRepository;
    private final CloudinaryService cloudinaryService;

    public MedicineService(MedicineRepository medicineRepository, CloudinaryService cloudinaryService) {
        this.medicineRepository = medicineRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public List<MedicineDto.MedicineResponse> getAllMedicines() {
        return medicineRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public MedicineDto.MedicineResponse getMedicineById(String id) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
        return convertToDto(medicine);
    }

    public MedicineDto.MedicineResponse createMedicine(MedicineDto.MedicineRequest request, String userId) {
        Medicine medicine = new Medicine();
        medicine.setName(request.getName());
        medicine.setBrand(request.getBrand());
        medicine.setPrice(request.getPrice());
        medicine.setStock(request.getStock());
        medicine.setDescription(request.getDescription());
        medicine.setImage(request.getImage());
        medicine.setCategory(request.getCategory());
        medicine.setCreatedBy(userId);

        Medicine savedMedicine = medicineRepository.save(medicine);
        return convertToDto(savedMedicine);
    }

    @Transactional
    public MedicineDto.MedicineResponse updateMedicine(String id, MedicineDto.MedicineRequest request) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
        
        // If image is being changed and old image is from Cloudinary, delete it
        if (request.getImage() != null && !request.getImage().equals(medicine.getImage()) && 
            medicine.getImage() != null && medicine.getImage().contains("cloudinary.com")) {
            try {
                cloudinaryService.deleteImage(medicine.getImage());
            } catch (Exception e) {
                logger.error("Failed to delete old image from Cloudinary", e);
                // Continue with update even if image deletion fails
            }
        }

        medicine.setName(request.getName());
        medicine.setBrand(request.getBrand());
        medicine.setPrice(request.getPrice());
        medicine.setStock(request.getStock());
        medicine.setDescription(request.getDescription());
        medicine.setImage(request.getImage());
        medicine.setCategory(request.getCategory());

        Medicine updatedMedicine = medicineRepository.save(medicine);
        return convertToDto(updatedMedicine);
    }

    @Transactional
    public void deleteMedicine(String id) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
        
        // Delete image from Cloudinary if it exists
        if (medicine.getImage() != null && medicine.getImage().contains("cloudinary.com")) {
            try {
                cloudinaryService.deleteImage(medicine.getImage());
            } catch (Exception e) {
                logger.error("Failed to delete image from Cloudinary", e);
                // Continue with deletion even if image deletion fails
            }
        }
        
        medicineRepository.deleteById(id);
    }

    public List<MedicineDto.MedicineResponse> searchMedicines(String query) {
        List<Medicine> nameResults = medicineRepository.findByNameContainingIgnoreCase(query);
        List<Medicine> brandResults = medicineRepository.findByBrandContainingIgnoreCase(query);
        
        // Combine results and remove duplicates
        return nameResults.stream()
                .filter(medicine -> !brandResults.contains(medicine))
                .collect(Collectors.toList())
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MedicineDto.MedicineResponse> getMedicinesByCategory(String category) {
        return medicineRepository.findByCategory(category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<MedicineDto.MedicineResponse> getMedicinesByUser(String userId) {
        return medicineRepository.findByCreatedBy(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private MedicineDto.MedicineResponse convertToDto(Medicine medicine) {
        return new MedicineDto.MedicineResponse(
                medicine.getId(),
                medicine.getName(),
                medicine.getBrand(),
                medicine.getPrice(),
                medicine.getStock(),
                medicine.getDescription(),
                medicine.getImage(),
                medicine.getCategory()
        );
    }
}

