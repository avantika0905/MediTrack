package com.pharmacy.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {
    private static final Logger logger = LoggerFactory.getLogger(CloudinaryService.class);
    
    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String uploadImage(MultipartFile file) {
        try {
            logger.info("Uploading image to Cloudinary: {}", file.getOriginalFilename());
            
            Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap(
                    "folder", "pharmacy_app/medicines",
                    "resource_type", "auto"
                )
            );
            
            String imageUrl = (String) uploadResult.get("secure_url");
            logger.info("Image uploaded successfully. URL: {}", imageUrl);
            
            return imageUrl;
        } catch (IOException e) {
            logger.error("Failed to upload image to Cloudinary", e);
            throw new RuntimeException("Failed to upload image", e);
        }
    }
    
    public void deleteImage(String imageUrl) {
        try {
            if (imageUrl == null || imageUrl.isEmpty() || !imageUrl.contains("cloudinary.com")) {
                return;
            }
            
            // Extract public ID from URL
            String[] urlParts = imageUrl.split("/");
            String fileName = urlParts[urlParts.length - 1];
            String publicId = "pharmacy_app/medicines/" + fileName.substring(0, fileName.lastIndexOf('.'));
            
            logger.info("Deleting image from Cloudinary with public ID: {}", publicId);
            
            Map result = cloudinary.uploader().destroy(
                publicId,
                ObjectUtils.emptyMap()
            );
            
            logger.info("Image deletion result: {}", result);
        } catch (IOException e) {
            logger.error("Failed to delete image from Cloudinary", e);
            // Don't throw exception here, just log the error
        }
    }
}

