package com.pharmacy.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderItemRequest {
        private String medicineId;
        private int quantity;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderRequest {
        private List<OrderItemRequest> items;
        private String shippingAddress;
        private String paymentMethod;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderItemResponse {
        private String medicineId;
        private String medicineName;
        private int quantity;
        private BigDecimal price;
        private BigDecimal total;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderResponse {
        private String id;
        private String userId;
        private List<OrderItemResponse> items;
        private BigDecimal totalAmount;
        private String status;
        private LocalDateTime orderDate;
        private String shippingAddress;
        private String paymentMethod;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderStatusUpdateRequest {
        private String status;
    }
}