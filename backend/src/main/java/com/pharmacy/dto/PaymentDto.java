package com.pharmacy.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

public class PaymentDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreateOrderRequest {
        private String orderId;
        private BigDecimal amount;
        private String currency;
        private String receipt;
        private String notes;
        private CustomerInfo customerInfo;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CustomerInfo {
        private String name;
        private String email;
        private String contact;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CreateOrderResponse {
        private String razorpayOrderId;
        private BigDecimal amount;
        private String currency;
        private String receipt;
        private String status;
        private String key;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PaymentVerificationRequest {
        private String orderId;
        private String razorpayOrderId;
        private String razorpayPaymentId;
        private String razorpaySignature;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PaymentResponse {
        private String id;
        private String orderId;
        private String razorpayOrderId;
        private String razorpayPaymentId;
        private BigDecimal amount;
        private String status;
        private String paymentMethod;
    }
}