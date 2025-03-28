package com.pharmacy.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String userId;
    private List<OrderItem> items;
    private BigDecimal totalAmount;
    private String status; // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
    private LocalDateTime orderDate;
    private String shippingAddress;
    private String paymentMethod;
}