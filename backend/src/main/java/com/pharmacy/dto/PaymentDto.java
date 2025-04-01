 
package com.pharmacy.dto;

import java.math.BigDecimal;

public class PaymentDto {

    public static class CreateOrderRequest {
        private String orderId;
        private BigDecimal amount;
        private String currency;
        private String receipt;
        private String notes;
        private CustomerInfo customerInfo;

        public String getOrderId() {
            return orderId;
        }

        public void setOrderId(String orderId) {
            this.orderId = orderId;
        }

        public BigDecimal getAmount() {
            return amount;
        }

        public void setAmount(BigDecimal amount) {
            this.amount = amount;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }

        public String getReceipt() {
            return receipt;
        }

        public void setReceipt(String receipt) {
            this.receipt = receipt;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }

        public CustomerInfo getCustomerInfo() {
            return customerInfo;
        }

        public void setCustomerInfo(CustomerInfo customerInfo) {
            this.customerInfo = customerInfo;
        }
    }

    public static class CustomerInfo {
        private String name;
        private String email;
        private String contact;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getContact() {
            return contact;
        }

        public void setContact(String contact) {
            this.contact = contact;
        }
    }

    public static class CreateOrderResponse {
        private String razorpayOrderId;
        private BigDecimal amount;
        private String currency;
        private String receipt;
        private String status;
        private String key;

        public CreateOrderResponse() {
        }

        public CreateOrderResponse(String razorpayOrderId, BigDecimal amount, String currency, String receipt, String status, String key) {
            this.razorpayOrderId = razorpayOrderId;
            this.amount = amount;
            this.currency = currency;
            this.receipt = receipt;
            this.status = status;
            this.key = key;
        }

        public String getRazorpayOrderId() {
            return razorpayOrderId;
        }

        public void setRazorpayOrderId(String razorpayOrderId) {
            this.razorpayOrderId = razorpayOrderId;
        }

        public BigDecimal getAmount() {
            return amount;
        }

        public void setAmount(BigDecimal amount) {
            this.amount = amount;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }

        public String getReceipt() {
            return receipt;
        }

        public void setReceipt(String receipt) {
            this.receipt = receipt;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }
    }

    public static class PaymentVerificationRequest {
        private String orderId;
        private String razorpayOrderId;
        private String razorpayPaymentId;
        private String razorpaySignature;

        public String getOrderId() {
            return orderId;
        }

        public void setOrderId(String orderId) {
            this.orderId = orderId;
        }

        public String getRazorpayOrderId() {
            return razorpayOrderId;
        }

        public void setRazorpayOrderId(String razorpayOrderId) {
            this.razorpayOrderId = razorpayOrderId;
        }

        public String getRazorpayPaymentId() {
            return razorpayPaymentId;
        }

        public void setRazorpayPaymentId(String razorpayPaymentId) {
            this.razorpayPaymentId = razorpayPaymentId;
        }

        public String getRazorpaySignature() {
            return razorpaySignature;
        }

        public void setRazorpaySignature(String razorpaySignature) {
            this.razorpaySignature = razorpaySignature;
        }
    }

    public static class PaymentResponse {
        private String id;
        private String orderId;
        private String razorpayOrderId;
        private String razorpayPaymentId;
        private BigDecimal amount;
        private String status;
        private String paymentMethod;

        public PaymentResponse() {
        }

        public PaymentResponse(String id, String orderId, String razorpayOrderId, String razorpayPaymentId, BigDecimal amount, String status, String paymentMethod) {
            this.id = id;
            this.orderId = orderId;
            this.razorpayOrderId = razorpayOrderId;
            this.razorpayPaymentId = razorpayPaymentId;
            this.amount = amount;
            this.status = status;
            this.paymentMethod = paymentMethod;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getOrderId() {
            return orderId;
        }

        public void setOrderId(String orderId) {
            this.orderId = orderId;
        }

        public String getRazorpayOrderId() {
            return razorpayOrderId;
        }

        public void setRazorpayOrderId(String razorpayOrderId) {
            this.razorpayOrderId = razorpayOrderId;
        }

        public String getRazorpayPaymentId() {
            return razorpayPaymentId;
        }

        public void setRazorpayPaymentId(String razorpayPaymentId) {
            this.razorpayPaymentId = razorpayPaymentId;
        }

        public BigDecimal getAmount() {
            return amount;
        }

        public void setAmount(BigDecimal amount) {
            this.amount = amount;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public String getPaymentMethod() {
            return paymentMethod;
        }

        public void setPaymentMethod(String paymentMethod) {
            this.paymentMethod = paymentMethod;
        }
    }
}