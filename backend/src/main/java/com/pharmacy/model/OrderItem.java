package com.pharmacy.model;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderItem {
    private String medicineId;
    private String medicineName;
    private int quantity;
    private BigDecimal price;
}