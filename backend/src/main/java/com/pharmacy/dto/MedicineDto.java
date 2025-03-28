package com.pharmacy.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

public class MedicineDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MedicineRequest {
        private String name;
        private String brand;
        private BigDecimal price;
        private int stock;
        private String description;
        private String image;
        private String category;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MedicineResponse {
        private String id;
        private String name;
        private String brand;
        private BigDecimal price;
        private int stock;
        private String description;
        private String image;
        private String category;
    }
}