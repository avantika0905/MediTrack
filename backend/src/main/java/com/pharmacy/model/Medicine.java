package com.pharmacy.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;

@Data
@Document(collection = "medicines")
public class Medicine {
    @Id
    private String id;
    private String name;
    private String brand;
    private BigDecimal price;
    private int stock;
    private String description;
    private String image;
    private String category;
    private String createdBy; // User ID who created this medicine
}