// package com.pharmacy.service;

// import com.pharmacy.dto.OrderDto;
// import com.pharmacy.model.Medicine;
// import com.pharmacy.model.Order;
// import com.pharmacy.model.OrderItem;
// import com.pharmacy.repository.MedicineRepository;
// import com.pharmacy.repository.OrderRepository;
// import com.pharmacy.repository.UserRepository;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import java.math.BigDecimal;
// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.stream.Collectors;

// @Service
// public class OrderService {
//     private final OrderRepository orderRepository;
//     private final MedicineRepository medicineRepository;
//     private final UserRepository userRepository;

//     public OrderService(OrderRepository orderRepository, 
//                         MedicineRepository medicineRepository,
//                         UserRepository userRepository) {
//         this.orderRepository = orderRepository;
//         this.medicineRepository = medicineRepository;
//         this.userRepository = userRepository;
//     }

//     public List<OrderDto.OrderResponse> getAllOrders() {
//         return orderRepository.findAll().stream()
//                 .map(this::convertToDto)
//                 .collect(Collectors.toList());
//     }

//     public OrderDto.OrderResponse getOrderById(String id) {
//         Order order = orderRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
//         return convertToDto(order);
//     }

//     public List<OrderDto.OrderResponse> getOrdersByUser(String userId) {
//         return orderRepository.findByUserId(userId).stream()
//                 .map(this::convertToDto)
//                 .collect(Collectors.toList());
//     }

//     @Transactional
//     public OrderDto.OrderResponse createOrder(OrderDto.OrderRequest request, String userEmail) {
//         // Find user by email
//         String userId = userRepository.findByEmail(userEmail)
//                 .orElseThrow(() -> new RuntimeException("User not found"))
//                 .getId();

//         // Create new order
//         Order order = new Order();
//         order.setUserId(userId);
//         order.setOrderDate(LocalDateTime.now());
//         order.setStatus("PENDING");
//         order.setShippingAddress(request.getShippingAddress());
//         order.setPaymentMethod(request.getPaymentMethod());

//         // Process order items
//         List<OrderItem> orderItems = new ArrayList<>();
//         BigDecimal totalAmount = BigDecimal.ZERO;

//         for (OrderDto.OrderItemRequest itemRequest : request.getItems()) {
//             Medicine medicine = medicineRepository.findById(itemRequest.getMedicineId())
//                     .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + itemRequest.getMedicineId()));

//             // Check if enough stock is available
//             if (medicine.getStock() < itemRequest.getQuantity()) {
//                 throw new RuntimeException("Not enough stock available for " + medicine.getName());
//             }

//             // Update medicine stock
//             medicine.setStock(medicine.getStock() - itemRequest.getQuantity());
//             medicineRepository.save(medicine);

//             // Create order item
//             OrderItem orderItem = new OrderItem();
//             orderItem.setMedicineId(medicine.getId());
//             orderItem.setMedicineName(medicine.getName());
//             orderItem.setQuantity(itemRequest.getQuantity());
//             orderItem.setPrice(medicine.getPrice());

//             orderItems.add(orderItem);
//             totalAmount = totalAmount.add(medicine.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
//         }

//         order.setItems(orderItems);
//         order.setTotalAmount(totalAmount);

//         Order savedOrder = orderRepository.save(order);
//         return convertToDto(savedOrder);
//     }

//     public OrderDto.OrderResponse updateOrderStatus(String id, OrderDto.OrderStatusUpdateRequest request) {
//         Order order = orderRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

//         order.setStatus(request.getStatus());
//         Order updatedOrder = orderRepository.save(order);
//         return convertToDto(updatedOrder);
//     }

//     private OrderDto.OrderResponse convertToDto(Order order) {
//         List<OrderDto.OrderItemResponse> itemResponses = order.getItems().stream()
//                 .map(item -> new OrderDto.OrderItemResponse(
//                         item.getMedicineId(),
//                         item.getMedicineName(),
//                         item.getQuantity(),
//                         item.getPrice(),
//                         item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
//                 ))
//                 .collect(Collectors.toList());

//         return new OrderDto.OrderResponse(
//                 order.getId(),
//                 order.getUserId(),
//                 itemResponses,
//                 order.getTotalAmount(),
//                 order.getStatus(),
//                 order.getOrderDate(),
//                 order.getShippingAddress(),
//                 order.getPaymentMethod()
//         );
//     }
// }



package com.pharmacy.service;

import com.pharmacy.dto.OrderDto;
import com.pharmacy.model.Medicine;
import com.pharmacy.model.Order;
import com.pharmacy.model.OrderItem;
import com.pharmacy.repository.MedicineRepository;
import com.pharmacy.repository.OrderRepository;
import com.pharmacy.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
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

    public List<OrderDto.OrderResponse> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDto.OrderResponse createOrder(OrderDto.OrderRequest request, String userId) {
        // Find user by email
        // String userId = userRepository.findByEmail(userEmail)
        //         .orElseThrow(() -> new RuntimeException("User not found"))
        //         .getId();

        // Create new order
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
                    .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + itemRequest.getMedicineId()));

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
                        item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
                ))
                .collect(Collectors.toList());

        return new OrderDto.OrderResponse(
                order.getId(),
                order.getUserId(),
                itemResponses,
                order.getTotalAmount(),
                order.getStatus(),
                order.getOrderDate(),
                order.getShippingAddress(),
                order.getPaymentMethod()
        );
    }
}