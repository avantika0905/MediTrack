// package com.pharmacy.service;

// import com.pharmacy.dto.PaymentDto;
// import com.pharmacy.model.Order;
// import com.pharmacy.model.Payment;
// import com.pharmacy.repository.OrderRepository;
// import com.pharmacy.repository.PaymentRepository;
// import com.razorpay.RazorpayClient;
// import com.razorpay.RazorpayException;
// import com.razorpay.Utils;
// import org.json.JSONObject;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.math.BigDecimal;
// import java.time.LocalDateTime;
// import java.util.HashMap;
// import java.util.Map;

// @Service
// public class PaymentService {
//     private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

//     private final RazorpayClient razorpayClient;
//     private final PaymentRepository paymentRepository;
//     private final OrderRepository orderRepository;

//     @Value("${razorpay.key.id}")
//     private String razorpayKeyId;

//     public PaymentService(RazorpayClient razorpayClient,
//             PaymentRepository paymentRepository,
//             OrderRepository orderRepository) {
//         this.razorpayClient = razorpayClient;
//         this.paymentRepository = paymentRepository;
//         this.orderRepository = orderRepository;
//     }

//     @Transactional
//     public PaymentDto.CreateOrderResponse createRazorpayOrder(PaymentDto.CreateOrderRequest request, String userId) {
//         try {
//             // Validate order
//             Order order = orderRepository.findById(request.getOrderId())
//                     .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));

//             // Ensure order belongs to the user
//             if (!order.getUserId().equals(userId)) {
//                 throw new RuntimeException("Order does not belong to the user");
//             }

//             // Convert amount to paise (Razorpay expects amount in smallest currency unit)
//             int amountInPaise = request.getAmount().multiply(new BigDecimal("100")).intValue();

//             // Create Razorpay order
//             JSONObject orderRequest = new JSONObject();
//             orderRequest.put("amount", amountInPaise);
//             orderRequest.put("currency", request.getCurrency());
//             orderRequest.put("receipt", request.getReceipt());

//             // Add notes if provided
//             if (request.getNotes() != null && !request.getNotes().isEmpty()) {
//                 orderRequest.put("notes", request.getNotes());
//             }

//             // Create order in Razorpay
//             com.razorpay.Order razorpayOrder = razorpayClient.orders.create(orderRequest);
//             String razorpayOrderId = razorpayOrder.get("id");

//             // Save payment details in our database
//             Payment payment = new Payment();
//             payment.setOrderId(request.getOrderId());
//             payment.setUserId(userId);
//             payment.setRazorpayOrderId(razorpayOrderId);
//             payment.setAmount(request.getAmount());
//             payment.setCurrency(request.getCurrency());
//             payment.setStatus("CREATED");
//             payment.setCreatedAt(LocalDateTime.now());
//             payment.setReceipt(request.getReceipt());
//             payment.setNotes(request.getNotes());

//             paymentRepository.save(payment);

//             // Return response
//             return new PaymentDto.CreateOrderResponse(
//                     razorpayOrderId,
//                     request.getAmount(),
//                     request.getCurrency(),
//                     request.getReceipt(),
//                     "created",
//                     razorpayKeyId);
//         } catch (RazorpayException e) {
//             logger.error("Error creating Razorpay order", e);
//             throw new RuntimeException("Failed to create payment order: " + e.getMessage());
//         }
//     }

//     @Transactional
//     public PaymentDto.PaymentResponse verifyAndUpdatePayment(PaymentDto.PaymentVerificationRequest request,
//             String userId) {
//         try {
//             // Find payment by Razorpay order ID
//             Payment payment = paymentRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
//                     .orElseThrow(() -> new RuntimeException(
//                             "Payment not found for order ID: " + request.getRazorpayOrderId()));

//             // Ensure payment belongs to the user
//             if (!payment.getUserId().equals(userId)) {
//                 throw new RuntimeException("Payment does not belong to the user");
//             }

//             // Verify signature
//             String data = request.getRazorpayOrderId() + "|" + request.getRazorpayPaymentId();
//             boolean isValidSignature = Utils.verifySignature(data, request.getRazorpaySignature(),
//                     razorpayClient.getSecret());

//             if (!isValidSignature) {
//                 payment.setStatus("FAILED");
//                 payment.setErrorCode("INVALID_SIGNATURE");
//                 payment.setErrorDescription("Payment signature verification failed");
//                 payment.setUpdatedAt(LocalDateTime.now());
//                 paymentRepository.save(payment);
//                 throw new RuntimeException("Payment verification failed: Invalid signature");
//             }

//             // Update payment details
//             payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
//             payment.setRazorpaySignature(request.getRazorpaySignature());
//             payment.setStatus("CAPTURED");
//             payment.setUpdatedAt(LocalDateTime.now());

//             Payment updatedPayment = paymentRepository.save(payment);

//             // Update order status
//             Order order = orderRepository.findById(request.getOrderId())
//                     .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));
//             order.setStatus("PROCESSING");
//             orderRepository.save(order);

//             // Return response
//             return new PaymentDto.PaymentResponse(
//                     updatedPayment.getId(),
//                     updatedPayment.getOrderId(),
//                     updatedPayment.getRazorpayOrderId(),
//                     updatedPayment.getRazorpayPaymentId(),
//                     updatedPayment.getAmount(),
//                     updatedPayment.getStatus(),
//                     updatedPayment.getPaymentMethod());
//         } catch (Exception e) {
//             logger.error("Error verifying payment", e);
//             throw new RuntimeException("Payment verification failed: " + e.getMessage());
//         }
//     }

//     public PaymentDto.PaymentResponse getPaymentByOrderId(String orderId, String userId) {
//         Payment payment = paymentRepository.findByOrderId(orderId)
//                 .stream()
//                 .findFirst()
//                 .orElseThrow(() -> new RuntimeException("Payment not found for order ID: " + orderId));

//         // Ensure payment belongs to the user
//         if (!payment.getUserId().equals(userId)) {
//             throw new RuntimeException("Payment does not belong to the user");
//         }

//         return new PaymentDto.PaymentResponse(
//                 payment.getId(),
//                 payment.getOrderId(),
//                 payment.getRazorpayOrderId(),
//                 payment.getRazorpayPaymentId(),
//                 payment.getAmount(),
//                 payment.getStatus(),
//                 payment.getPaymentMethod());
//     }
// }




















































































// package com.pharmacy.service;

// import com.pharmacy.dto.PaymentDto;
// import com.pharmacy.model.Order;
// import com.pharmacy.model.Payment;
// import com.pharmacy.repository.OrderRepository;
// import com.pharmacy.repository.PaymentRepository;
// import com.razorpay.RazorpayClient;
// import com.razorpay.RazorpayException;
// import com.razorpay.Utils;
// import org.json.JSONObject;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.math.BigDecimal;
// import java.time.LocalDateTime;

// @Service
// public class PaymentService {
//     private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

//     private final RazorpayClient razorpayClient;
//     private final PaymentRepository paymentRepository;
//     private final OrderRepository orderRepository;

//     @Value("${razorpay.key.id}")
//     private String razorpayKeyId;

//     // Inject the secret key from application properties
//     @Value("${razorpay.key.secret}")
//     private String razorpayKeySecret;

//     public PaymentService(RazorpayClient razorpayClient,
//                           PaymentRepository paymentRepository,
//                           OrderRepository orderRepository) {
//         this.razorpayClient = razorpayClient;
//         this.paymentRepository = paymentRepository;
//         this.orderRepository = orderRepository;
//     }

//     @Transactional
//     public PaymentDto.CreateOrderResponse createRazorpayOrder(PaymentDto.CreateOrderRequest request, String userId) {
//         try {
//             // Validate order
//             Order order = orderRepository.findById(request.getOrderId())
//                     .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));

//             // Ensure order belongs to the user
//             if (!order.getUserId().equals(userId)) {
//                 throw new RuntimeException("Order does not belong to the user");
//             }

//             // Convert amount to paise (Razorpay expects amount in smallest currency unit)
//             int amountInPaise = request.getAmount().multiply(new BigDecimal("100")).intValue();

//             // Create Razorpay order
//             JSONObject orderRequest = new JSONObject();
//             orderRequest.put("amount", amountInPaise);
//             orderRequest.put("currency", request.getCurrency());
//             orderRequest.put("receipt", request.getReceipt());

//             // Add notes if provided
//             if (request.getNotes() != null && !request.getNotes().isEmpty()) {
//                 orderRequest.put("notes", request.getNotes());
//             }

//             // Create order in Razorpay
//             com.razorpay.Order razorpayOrder = razorpayClient.orders.create(orderRequest);
//             String razorpayOrderId = razorpayOrder.get("id");

//             // Save payment details in our database
//             Payment payment = new Payment();
//             payment.setOrderId(request.getOrderId());
//             payment.setUserId(userId);
//             payment.setRazorpayOrderId(razorpayOrderId);
//             payment.setAmount(request.getAmount());
//             payment.setCurrency(request.getCurrency());
//             payment.setStatus("CREATED");
//             payment.setCreatedAt(LocalDateTime.now());
//             payment.setReceipt(request.getReceipt());
//             payment.setNotes(request.getNotes());

//             paymentRepository.save(payment);

//             // Return response
//             return new PaymentDto.CreateOrderResponse(
//                     razorpayOrderId,
//                     request.getAmount(),
//                     request.getCurrency(),
//                     request.getReceipt(),
//                     "created",
//                     razorpayKeyId);
//         } catch (RazorpayException e) {
//             logger.error("Error creating Razorpay order", e);
//             throw new RuntimeException("Failed to create payment order: " + e.getMessage());
//         }
//     }

//     @Transactional
//     public PaymentDto.PaymentResponse verifyAndUpdatePayment(PaymentDto.PaymentVerificationRequest request,
//                                                              String userId) {
//         try {
//             // Find payment by Razorpay order ID
//             Payment payment = paymentRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
//                     .orElseThrow(() -> new RuntimeException(
//                             "Payment not found for order ID: " + request.getRazorpayOrderId()));

//             // Ensure payment belongs to the user
//             if (!payment.getUserId().equals(userId)) {
//                 throw new RuntimeException("Payment does not belong to the user");
//             }

//             // Verify signature using the secret key injected from properties
//             String data = request.getRazorpayOrderId() + "|" + request.getRazorpayPaymentId();
//             boolean isValidSignature = Utils.verifySignature(data, request.getRazorpaySignature(), razorpayKeySecret);

//             if (!isValidSignature) {
//                 payment.setStatus("FAILED");
//                 payment.setErrorCode("INVALID_SIGNATURE");
//                 payment.setErrorDescription("Payment signature verification failed");
//                 payment.setUpdatedAt(LocalDateTime.now());
//                 paymentRepository.save(payment);
//                 throw new RuntimeException("Payment verification failed: Invalid signature");
//             }

//             // Update payment details
//             payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
//             payment.setRazorpaySignature(request.getRazorpaySignature());
//             payment.setStatus("CAPTURED");
//             payment.setUpdatedAt(LocalDateTime.now());

//             Payment updatedPayment = paymentRepository.save(payment);

//             // Update order status
//             Order order = orderRepository.findById(request.getOrderId())
//                     .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));
//             order.setStatus("PROCESSING");
//             orderRepository.save(order);

//             // Return response
//             return new PaymentDto.PaymentResponse(
//                     updatedPayment.getId(),
//                     updatedPayment.getOrderId(),
//                     updatedPayment.getRazorpayOrderId(),
//                     updatedPayment.getRazorpayPaymentId(),
//                     updatedPayment.getAmount(),
//                     updatedPayment.getStatus(),
//                     updatedPayment.getPaymentMethod());
//         } catch (Exception e) {
//             logger.error("Error verifying payment", e);
//             throw new RuntimeException("Payment verification failed: " + e.getMessage());
//         }
//     }

//     public PaymentDto.PaymentResponse getPaymentByOrderId(String orderId, String userId) {
//         Payment payment = paymentRepository.findByOrderId(orderId)
//                 .stream()
//                 .findFirst()
//                 .orElseThrow(() -> new RuntimeException("Payment not found for order ID: " + orderId));

//         // Ensure payment belongs to the user
//         if (!payment.getUserId().equals(userId)) {
//             throw new RuntimeException("Payment does not belong to the user");
//         }

//         return new PaymentDto.PaymentResponse(
//                 payment.getId(),
//                 payment.getOrderId(),
//                 payment.getRazorpayOrderId(),
//                 payment.getRazorpayPaymentId(),
//                 payment.getAmount(),
//                 payment.getStatus(),
//                 payment.getPaymentMethod());
//     }
// }









































































package com.pharmacy.service;

import com.pharmacy.dto.PaymentDto;
import com.pharmacy.model.Order;
import com.pharmacy.model.Payment;
import com.pharmacy.repository.OrderRepository;
import com.pharmacy.repository.PaymentRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {
    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);

    private final RazorpayClient razorpayClient;
    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;
    
    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    public PaymentService(RazorpayClient razorpayClient, 
                          PaymentRepository paymentRepository,
                          OrderRepository orderRepository) {
        this.razorpayClient = razorpayClient;
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public PaymentDto.CreateOrderResponse createRazorpayOrder(PaymentDto.CreateOrderRequest request, String userId) {
        try {
            // Validate order
            Order order = orderRepository.findById(request.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));

            // Ensure order belongs to the user
            if (!order.getUserId().equals(userId)) {
                throw new RuntimeException("Order does not belong to the user");
            }

            // Convert amount to paise (Razorpay expects amount in smallest currency unit)
            int amountInPaise = request.getAmount().multiply(new BigDecimal("100")).intValue();

            // Create Razorpay order
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", request.getCurrency());
            orderRequest.put("receipt", request.getReceipt());
            
            // Add notes if provided
            if (request.getNotes() != null && !request.getNotes().isEmpty()) {
                orderRequest.put("notes", request.getNotes());
            }

            // Create order in Razorpay
            com.razorpay.Order razorpayOrder = razorpayClient.orders.create(orderRequest);
            String razorpayOrderId = razorpayOrder.get("id");

            // Save payment details in our database
            Payment payment = new Payment();
            payment.setOrderId(request.getOrderId());
            payment.setUserId(userId);
            payment.setRazorpayOrderId(razorpayOrderId);
            payment.setAmount(request.getAmount());
            payment.setCurrency(request.getCurrency());
            payment.setStatus("CREATED");
            payment.setCreatedAt(LocalDateTime.now());
            payment.setReceipt(request.getReceipt());
            payment.setNotes(request.getNotes());
            
            paymentRepository.save(payment);

            // Return response
            return new PaymentDto.CreateOrderResponse(
                    razorpayOrderId,
                    request.getAmount(),
                    request.getCurrency(),
                    request.getReceipt(),
                    "created",
                    razorpayKeyId
            );
        } catch (RazorpayException e) {
            logger.error("Error creating Razorpay order", e);
            throw new RuntimeException("Failed to create payment order: " + e.getMessage());
        }
    }

    @Transactional
    public PaymentDto.PaymentResponse verifyAndUpdatePayment(PaymentDto.PaymentVerificationRequest request, String userId) {
        try {
            // Find payment by Razorpay order ID
            Payment payment = paymentRepository.findByRazorpayOrderId(request.getRazorpayOrderId())
                    .orElseThrow(() -> new RuntimeException("Payment not found for order ID: " + request.getRazorpayOrderId()));

            // Ensure payment belongs to the user
            if (!payment.getUserId().equals(userId)) {
                throw new RuntimeException("Payment does not belong to the user");
            }

            // Verify signature
            String data = request.getRazorpayOrderId() + "|" + request.getRazorpayPaymentId();
            
            // Use the razorpayKeySecret directly instead of trying to get it from the client
            boolean isValidSignature = Utils.verifySignature(data, request.getRazorpaySignature(), razorpayKeySecret);

            if (!isValidSignature) {
                payment.setStatus("FAILED");
                payment.setErrorCode("INVALID_SIGNATURE");
                payment.setErrorDescription("Payment signature verification failed");
                payment.setUpdatedAt(LocalDateTime.now());
                paymentRepository.save(payment);
                throw new RuntimeException("Payment verification failed: Invalid signature");
            }

            // Update payment details
            payment.setRazorpayPaymentId(request.getRazorpayPaymentId());
            payment.setRazorpaySignature(request.getRazorpaySignature());
            payment.setStatus("CAPTURED");
            payment.setUpdatedAt(LocalDateTime.now());
            
            Payment updatedPayment = paymentRepository.save(payment);

            // Update order status
            Order order = orderRepository.findById(request.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));
            order.setStatus("PROCESSING");
            orderRepository.save(order);

            // Return response
            return new PaymentDto.PaymentResponse(
                    updatedPayment.getId(),
                    updatedPayment.getOrderId(),
                    updatedPayment.getRazorpayOrderId(),
                    updatedPayment.getRazorpayPaymentId(),
                    updatedPayment.getAmount(),
                    updatedPayment.getStatus(),
                    updatedPayment.getPaymentMethod()
            );
        } catch (Exception e) {
            logger.error("Error verifying payment", e);
            throw new RuntimeException("Payment verification failed: " + e.getMessage());
        }
    }

    public PaymentDto.PaymentResponse getPaymentByOrderId(String orderId, String userId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Payment not found for order ID: " + orderId));

        // Ensure payment belongs to the user
        if (!payment.getUserId().equals(userId)) {
            throw new RuntimeException("Payment does not belong to the user");
        }

        return new PaymentDto.PaymentResponse(
                payment.getId(),
                payment.getOrderId(),
                payment.getRazorpayOrderId(),
                payment.getRazorpayPaymentId(),
                payment.getAmount(),
                payment.getStatus(),
                payment.getPaymentMethod()
        );
    }
}