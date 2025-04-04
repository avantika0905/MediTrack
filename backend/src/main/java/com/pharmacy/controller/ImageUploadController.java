package com.pharmacy.controller;

import com.pharmacy.service.CloudinaryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/upload")
public class ImageUploadController {
    private static final Logger logger = LoggerFactory.getLogger(ImageUploadController.class);
    
    private final CloudinaryService cloudinaryService;

    public ImageUploadController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        logger.info("Received image upload request: {}", file.getOriginalFilename());
        
        if (file.isEmpty()) {
            logger.error("Uploaded file is empty");
            return ResponseEntity.badRequest().body(Map.of("error", "Please select a file to upload"));
        }
        
        try {
            String imageUrl = cloudinaryService.uploadImage(file);
            
            Map<String, String> response = new HashMap<>();
            response.put("url", imageUrl);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Failed to upload image", e);
            return ResponseEntity.internalServerError().body(Map.of("error", "Failed to upload image: " + e.getMessage()));
        }
    }
}

