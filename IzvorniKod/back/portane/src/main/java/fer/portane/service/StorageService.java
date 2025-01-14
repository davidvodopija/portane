package fer.portane.service;

import io.minio.*;
import io.minio.http.Method;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class StorageService {
    @Autowired
    private MinioClient minioClient;

    public String upload(String bucketName, String objectName, MultipartFile file) throws Exception {
        InputStream inputStream = file.getInputStream();
        String contentType = file.getContentType();

        // Upload the file
        minioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .stream(inputStream, file.getSize(), -1)
                        .contentType(contentType)
                        .build()
        );

        // Return the URL to access the object
        return getPresignedUrl(bucketName, objectName);
    }

    public String getPresignedUrl(String bucketName, String objectName) throws Exception {
        return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .bucket(bucketName)
                        .object(objectName)
                        .method(Method.GET)
                        .expiry(60 * 60) // URL valid for 1 hour
                        .build()
        );
    }
}
