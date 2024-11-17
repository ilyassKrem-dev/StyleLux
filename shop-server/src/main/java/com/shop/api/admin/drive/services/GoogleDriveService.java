package com.shop.api.admin.drive.services;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.Collections;

import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.Permission;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.FileContent;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;

@Service
public class GoogleDriveService {
    
    @Value("${google.drive.credentials}")
    private String credentialsFilePath;
    
    private Drive driveService;


    public Drive getDriveService() throws FileNotFoundException, IOException {
        InputStream credentialStream = getClass().getClassLoader().getResourceAsStream(credentialsFilePath.replace("classpath:", ""));
        if(driveService == null) {
            GoogleCredential credential = GoogleCredential.fromStream(credentialStream)
                .createScoped(Collections.singleton(DriveScopes.DRIVE_FILE));
            if(credential == null) {
                throw new NullPointerException("Failed to create credential");
            }
            driveService = new Drive.Builder(credential.getTransport(), credential.getJsonFactory(), credential)
                .setApplicationName("E-commerce drive")
                .build();
                
        }
        return driveService;
    }

    public String uploadFile(java.io.File file) throws FileNotFoundException, IOException {
        
        Drive drive = getDriveService();
        

        File fileMetadata = new File();
        fileMetadata.setName(file.getName());

        String mimeType = URLConnection.guessContentTypeFromName(file.getName());
        if (mimeType == null) {
            mimeType = "application/octet-stream";
        }
        FileContent mediaContent = new FileContent(mimeType, file);
        com.google.api.services.drive.model.File uploadedFile = drive.files().create(fileMetadata, mediaContent)
            .setFields("id, webViewLink") 
            .execute();

        drive.permissions().create(uploadedFile.getId(), new Permission()
            .setType("anyone")
            .setRole("reader"))
            .execute();
            
        return "https://drive.google.com/thumbnail?id=" + uploadedFile.getId() +"&sz=s4000";


    }
}
