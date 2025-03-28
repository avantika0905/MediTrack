package com.pharmacy.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "medicines")
public class Medicine {
    @Id
    private String id;
    private String name;
    private String brand;
    private String description;
    private double price;
    private int stock;
    private String imageUrl;
    private String category;
}
