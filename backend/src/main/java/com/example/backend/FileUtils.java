package com.example.backend;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.UUID;

public final class FileUtils {

    private FileUtils() { }

    public static String generateUniqueFileName(final MultipartFile multipartFile) {
        String ext = StringUtils.getFilenameExtension(multipartFile.getOriginalFilename());

        return UUID.randomUUID() + "." + ext;
    }

    public static void createFile(final String fileName, final MultipartFile multipartFile) throws IOException {
        Path uploadPath = Path.of(System.getProperty("user.home") + "/server-data");

        if (!Files.exists(uploadPath)) {
            Files.createDirectory(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Files.copy(inputStream, filePath);
        } catch (IOException ex) {
            throw new IOException("Could not save image file: " + fileName + " to " + uploadPath.getFileName());
        }
    }

    public static void createFile(final String fileName, final byte[] byteArray) throws IOException {
        Path uploadPath = Path.of(System.getProperty("user.home") + "/server-data");

        if (!Files.exists(uploadPath)) {
            Files.createDirectory(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);

        try (FileOutputStream fileOutputStream = new FileOutputStream(filePath.toString())) {
            fileOutputStream.write(byteArray);
        } catch (IOException ex) {
            throw new IOException("Could not save image file: " + fileName + " to " + uploadPath.getFileName());
        }
    }
}
