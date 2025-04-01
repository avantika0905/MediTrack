 

package com.pharmacy.service;

import com.pharmacy.dto.OrderDto;
import com.pharmacy.model.Medicine;
import com.pharmacy.model.Order;
import com.pharmacy.model.OrderItem;
import com.pharmacy.model.User;
import com.pharmacy.repository.MedicineRepository;
import com.pharmacy.repository.OrderRepository;
import com.pharmacy.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Collections;

@Service
public class OrderService {
    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;
    private final MedicineRepository medicineRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,
            MedicineRepository medicineRepository,
            UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.medicineRepository = medicineRepository;
        this.userRepository = userRepository;
    }

    public List<OrderDto.OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public OrderDto.OrderResponse getOrderById(String id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return convertToDto(order);
    }

    // public List<OrderDto.OrderResponse> getOrdersByUser(String userEmail) {
    // // First try to find user by email to get their ID
    // Optional<User> userOpt = userRepository.findByEmail(userEmail);

    // if (userOpt.isPresent()) {
    // String userId = userOpt.get().getId();
    // logger.info("Found user ID {} for email {}", userId, userEmail);
    // return orderRepository.findByUserId(userId).stream()
    // .map(this::convertToDto)
    // .collect(Collectors.toList());
    // } else {
    // // If user not found by email, try using the email as the userId directly
    // logger.info("User not found by email, using email as userId: {}", userEmail);
    // return orderRepository.findByUserId(userEmail).stream()
    // .map(this::convertToDto)
    // .collect(Collectors.toList());
    // }
    // }

    public List<OrderDto.OrderResponse> getOrdersByUser(String userEmail) {
        // Fetch user by email
        Optional<User> userOpt = userRepository.findByEmail(userEmail);

        if (!userOpt.isPresent()) {
            logger.warn("No user found with email: {}", userEmail);
            return Collections.emptyList(); // Return empty list if user is not found
        }

        String userId = userOpt.get().getId();
        logger.info("Found user ID {} for email {}", userId, userEmail);

        // Fetch orders using the correct userId(Here mistakenly we have used email as
        // useId thats why passing email to find user related orders )
        List<Order> orders = orderRepository.findByUserId(userEmail);

        if (orders.isEmpty()) {
            logger.warn("No orders found for user ID: {}", userId);
        } else {
            logger.info("Retrieved {} orders for user ID: {}", orders.size(), userId);
        }

        // Convert to DTO
        return orders.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // @Transactional
    // public OrderDto.OrderResponse createOrder(OrderDto.OrderRequest request,
    // String userEmail) {
    // logger.info("Creating order for user email: {}", userEmail);

    // // Try to find user by email
    // String userId = userEmail;
    // Optional<User> userOpt = userRepository.findByEmail(userEmail);
    // if (userOpt.isPresent()) {
    // userId = userOpt.get().getId();
    // logger.info("Found user ID: {} for email: {}", userId, userEmail);
    // } else {
    // logger.warn("User not found by email: {}, using email as userId", userEmail);
    // }

    // // Create new order
    // Order order = new Order();
    // order.setUserId(userId);
    // order.setOrderDate(LocalDateTime.now());
    // order.setStatus("PENDING");
    // order.setShippingAddress(request.getShippingAddress());
    // order.setPaymentMethod(request.getPaymentMethod());

    // // Process order items
    // List<OrderItem> orderItems = new ArrayList<>();
    // BigDecimal totalAmount = BigDecimal.ZERO;

    // for (OrderDto.OrderItemRequest itemRequest : request.getItems()) {
    // Medicine medicine = medicineRepository.findById(itemRequest.getMedicineId())
    // .orElseThrow(() -> new RuntimeException("Medicine not found with id: " +
    // itemRequest.getMedicineId()));

    // // Check if enough stock is available
    // if (medicine.getStock() < itemRequest.getQuantity()) {
    // throw new RuntimeException("Not enough stock available for " +
    // medicine.getName());
    // }

    // // Update medicine stock
    // medicine.setStock(medicine.getStock() - itemRequest.getQuantity());
    // medicineRepository.save(medicine);

    // // Create order item
    // OrderItem orderItem = new OrderItem();
    // orderItem.setMedicineId(medicine.getId());
    // orderItem.setMedicineName(medicine.getName());
    // orderItem.setQuantity(itemRequest.getQuantity());
    // orderItem.setPrice(medicine.getPrice());

    // orderItems.add(orderItem);
    // totalAmount =
    // totalAmount.add(medicine.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
    // }

    // order.setItems(orderItems);
    // order.setTotalAmount(totalAmount);

    // Order savedOrder = orderRepository.save(order);
    // logger.info("Order created successfully with ID: {}", savedOrder.getId());
    // return convertToDto(savedOrder);
    // }

    @Transactional
    public OrderDto.OrderResponse createOrder(OrderDto.OrderRequest request, String userEmail) {
        logger.info("Creating order for user email: {}", userEmail);

        // Try to find user by email
        Optional<User> userOpt = userRepository.findByEmail(userEmail);
        if (!userOpt.isPresent()) {
            logger.error("User not found by email: {}", userEmail);
            throw new RuntimeException("User not found for email: " + userEmail);
        }

        // User found - log the full user info and retrieve the user ID
        User user = userOpt.get();

        logger.info(
                "*************************************User found: {}***********************************************************************",
                user);

        // Ensure User.toString() is overridden for complete info
        // String userId = user.getId();
        // logger.info("userid", user.getId());

        String userId = user.getId();
        logger.info("User", userId);

        // Create new order with the correct userId
        Order order = new Order();
        order.setUserId(userId);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        order.setShippingAddress(request.getShippingAddress());
        order.setPaymentMethod(request.getPaymentMethod());

        // Process order items
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderDto.OrderItemRequest itemRequest : request.getItems()) {
            Medicine medicine = medicineRepository.findById(itemRequest.getMedicineId())
                    .orElseThrow(
                            () -> new RuntimeException("Medicine not found with id: " + itemRequest.getMedicineId()));

            // Check if enough stock is available
            if (medicine.getStock() < itemRequest.getQuantity()) {
                throw new RuntimeException("Not enough stock available for " + medicine.getName());
            }

            // Update medicine stock
            medicine.setStock(medicine.getStock() - itemRequest.getQuantity());
            medicineRepository.save(medicine);

            // Create order item
            OrderItem orderItem = new OrderItem();
            orderItem.setMedicineId(medicine.getId());
            orderItem.setMedicineName(medicine.getName());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(medicine.getPrice());

            orderItems.add(orderItem);
            totalAmount = totalAmount.add(medicine.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setItems(orderItems);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);
        logger.info("Order created successfully with ID: {}", savedOrder.getId());
        return convertToDto(savedOrder);
    }

    public OrderDto.OrderResponse updateOrderStatus(String id, OrderDto.OrderStatusUpdateRequest request) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        order.setStatus(request.getStatus());
        Order updatedOrder = orderRepository.save(order);
        return convertToDto(updatedOrder);
    }

    private OrderDto.OrderResponse convertToDto(Order order) {
        List<OrderDto.OrderItemResponse> itemResponses = order.getItems().stream()
                .map(item -> new OrderDto.OrderItemResponse(
                        item.getMedicineId(),
                        item.getMedicineName(),
                        item.getQuantity(),
                        item.getPrice(),
                        item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()))))
                .collect(Collectors.toList());

        return new OrderDto.OrderResponse(
                order.getId(),
                order.getUserId(),
                itemResponses,
                order.getTotalAmount(),
                order.getStatus(),
                order.getOrderDate(),
                order.getShippingAddress(),
                order.getPaymentMethod());
    }
}