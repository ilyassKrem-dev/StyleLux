package com.shop.api.admin.drive;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.shop.api.admin.drive.services.GoogleDriveService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/admin/upload")
public class FileUploadController {
    
    private final GoogleDriveService googleDriveService;
    @Value("${path.file}")
    private String uploadDir;

    public FileUploadController(GoogleDriveService googleDriveService) {
        this.googleDriveService = googleDriveService;
    }

    @PostMapping({"","/"})
    public ResponseEntity<String> uploadFile(
        @RequestBody(required=true) MultipartFile file
        ) {
            File dir = new File(uploadDir);
            if(!dir.exists()) {
                dir.mkdir();
            }
            File convertedFile = new File(uploadDir + file.getOriginalFilename());

            try {
                file.transferTo(convertedFile);
                String fileUrl = googleDriveService.uploadFile(convertedFile);
                return ResponseEntity.ok(fileUrl);
                
            } catch (IOException | IllegalStateException e) {
                return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
            } finally {
                if(convertedFile.exists()) convertedFile.delete();
                

            }
    }
    
}
