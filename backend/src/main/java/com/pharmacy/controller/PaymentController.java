 
// ******************************************** 29/03/2025 prompt-- 3  code ********************************************************** 
// package com.pharmacy.controller;

// import com.pharmacy.dto.PaymentDto;
// import com.pharmacy.service.PaymentService;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/payments")
// @CrossOrigin(origins = "*", allowedHeaders = "*")
// public class PaymentController {
//     private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
//     private final PaymentService paymentService;

//     public PaymentController(PaymentService paymentService) {
//         this.paymentService = paymentService;
//     }

//     @PostMapping("/create-order")
//     public ResponseEntity<?> createOrder(@RequestBody PaymentDto.CreateOrderRequest request) {
//         try {
//             Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//             String userId = authentication.getName();
            
//             logger.info("Creating Razorpay order for user: {}", userId);
//             PaymentDto.CreateOrderResponse response = paymentService.createRazorpayOrder(request, userId);
//             return ResponseEntity.ok(response);
//         } catch (Exception e) {
//             logger.error("Error creating payment order", e);
//             return ResponseEntity.badRequest().body(new ErrorResponse("Failed to create payment order: " + e.getMessage()));
//         }
//     }

//     @PostMapping("/verify")
//     public ResponseEntity<?> verifyPayment(@RequestBody PaymentDto.PaymentVerificationRequest request) {
//         try {
//             Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//             String userId = authentication.getName();
            
//             logger.info("Verifying payment for user: {}", userId);
//             PaymentDto.PaymentResponse response = paymentService.verifyAndUpdatePayment(request, userId);
//             return ResponseEntity.ok(response);
//         } catch (Exception e) {
//             logger.error("Error verifying payment", e);
//             return ResponseEntity.badRequest().body(new ErrorResponse("Failed to verify payment: " + e.getMessage()));
//         }
//     }

//     @GetMapping("/order/{orderId}")
//     public ResponseEntity<?> getPaymentByOrderId(@PathVariable String orderId) {
//         try {
//             Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//             String userId = authentication.getName();
            
//             logger.info("Fetching payment for order: {} by user: {}", orderId, userId);
//             PaymentDto.PaymentResponse response = paymentService.getPaymentByOrderId(orderId, userId);
//             return ResponseEntity.ok(response);
//         } catch (Exception e) {
//             logger.error("Error fetching payment", e);
//             return ResponseEntity.badRequest().body(new ErrorResponse("Failed to fetch payment: " + e.getMessage()));
//         }
//     }
    
//     // Simple error response class
//     private static class ErrorResponse {
//         private final String message;
        
//         public ErrorResponse(String message) {
//             this.message = message;
//         }
        
//         public String getMessage() {
//             return message;
//         }
//     }
// }




















package com.pharmacy.controller;

import com.pharmacy.dto.PaymentDto;
import com.pharmacy.service.PaymentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PaymentController {
    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody PaymentDto.CreateOrderRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = authentication.getName();
            
            logger.info("Creating Razorpay order for user: {}", userId);
            logger.info("Request details: orderId={}, amount={}, currency={}", 
                       request.getOrderId(), request.getAmount(), request.getCurrency());
            
            PaymentDto.CreateOrderResponse response = paymentService.createRazorpayOrder(request, userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error creating payment order", e);
            return ResponseEntity.badRequest().body(new ErrorResponse("Failed to create payment order: " + e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentDto.PaymentVerificationRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = authentication.getName();
            
            logger.info("Verifying payment for user: {}", userId);
            PaymentDto.PaymentResponse response = paymentService.verifyAndUpdatePayment(request, userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error verifying payment", e);
            return ResponseEntity.badRequest().body(new ErrorResponse("Failed to verify payment: " + e.getMessage()));
        }
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getPaymentByOrderId(@PathVariable String orderId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = authentication.getName();
            
            logger.info("Fetching payment for order: {} by user: {}", orderId, userId);
            PaymentDto.PaymentResponse response = paymentService.getPaymentByOrderId(orderId, userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Error fetching payment", e);
            return ResponseEntity.badRequest().body(new ErrorResponse("Failed to fetch payment: " + e.getMessage()));
        }
    }
    
    // Simple error response class
    private static class ErrorResponse {
        private final String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
    }
}