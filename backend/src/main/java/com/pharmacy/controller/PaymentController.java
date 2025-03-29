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
// public class PaymentController {
//     private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
//     private final PaymentService paymentService;

//     public PaymentController(PaymentService paymentService) {
//         this.paymentService = paymentService;
//     }

//     @PostMapping("/create-order")
//     public ResponseEntity<PaymentDto.CreateOrderResponse> createOrder(
//             @RequestBody PaymentDto.CreateOrderRequest request) {
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String currentUserEmail = authentication.getName();

//         logger.info("Creating Razorpay order for user: {}", currentUserEmail);
//         return ResponseEntity.ok(paymentService.createRazorpayOrder(request, currentUserEmail));
//     }

//     @PostMapping("/verify")
//     public ResponseEntity<PaymentDto.PaymentResponse> verifyPayment(
//             @RequestBody PaymentDto.PaymentVerificationRequest request) {
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String currentUserEmail = authentication.getName();

//         logger.info("Verifying payment for user: {}", currentUserEmail);
//         return ResponseEntity.ok(paymentService.verifyAndUpdatePayment(request, currentUserEmail));
//     }

//     @GetMapping("/order/{orderId}")
//     public ResponseEntity<PaymentDto.PaymentResponse> getPaymentByOrderId(@PathVariable String orderId) {
//         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//         String currentUserEmail = authentication.getName();

//         logger.info("Fetching payment for order: {} by user: {}", orderId, currentUserEmail);
//         return ResponseEntity.ok(paymentService.getPaymentByOrderId(orderId, currentUserEmail));
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
public class PaymentController {
    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<PaymentDto.CreateOrderResponse> createOrder(@RequestBody PaymentDto.CreateOrderRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        
        logger.info("Creating Razorpay order for user: {}", userId);
        return ResponseEntity.ok(paymentService.createRazorpayOrder(request, userId));
    }

    @PostMapping("/verify")
    public ResponseEntity<PaymentDto.PaymentResponse> verifyPayment(@RequestBody PaymentDto.PaymentVerificationRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        
        logger.info("Verifying payment for user: {}", userId);
        return ResponseEntity.ok(paymentService.verifyAndUpdatePayment(request, userId));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<PaymentDto.PaymentResponse> getPaymentByOrderId(@PathVariable String orderId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        
        logger.info("Fetching payment for order: {} by user: {}", orderId, userId);
        return ResponseEntity.ok(paymentService.getPaymentByOrderId(orderId, userId));
    }
}