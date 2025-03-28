package com.pharmacy.service;

import com.pharmacy.dto.MedicineDto;
import com.pharmacy.model.Medicine;
import com.pharmacy.repository.MedicineRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicineService {
    private final MedicineRepository medicineRepository;

    public MedicineService(MedicineRepository medicineRepository) {
        this.medicineRepository = medicineRepository;
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

    public MedicineDto.MedicineResponse updateMedicine(String id, MedicineDto.MedicineRequest request) {
        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));

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

    public void deleteMedicine(String id) {
        if (!medicineRepository.existsById(id)) {
            throw new RuntimeException("Medicine not found with id: " + id);
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