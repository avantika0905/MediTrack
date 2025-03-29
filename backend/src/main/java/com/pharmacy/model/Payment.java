package com.pharmacy.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Document(collection = "payments")
public class Payment {
    @Id
    private String id;
    private String orderId;
    private String userId;
    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
    private BigDecimal amount;
    private String currency;
    private String status; // CREATED, AUTHORIZED, CAPTURED, FAILED
    private String paymentMethod;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String receipt;
    private String notes;
    private String errorCode;
    private String errorDescription;
}