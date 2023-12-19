package com.example.backend;

import lombok.extern.slf4j.Slf4j;
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

    private static final Path DEFAULT_FILE_UPLOAD_PATH =  Path.of(System.getProperty("user.home") + "/server-data");;

    static {
        if (!Files.exists(DEFAULT_FILE_UPLOAD_PATH)) {
            try {
                Files.createDirectory(DEFAULT_FILE_UPLOAD_PATH);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public static String generateUniqueFileName(MultipartFile multipartFile) {
        String ext = StringUtils.getFilenameExtension(multipartFile.getOriginalFilename());

        return UUID.randomUUID() + "." + ext;
    }

    public static void createFile(String fileName, MultipartFile multipartFile) throws IOException {
        Path filePath = DEFAULT_FILE_UPLOAD_PATH.resolve(fileName);

        try (InputStream inputStream = multipartFile.getInputStream()) {
            Files.copy(inputStream, filePath);
        }
    }

    public static void createFile(String fileName, byte[] byteArray) throws IOException {
        Path filePath = DEFAULT_FILE_UPLOAD_PATH.resolve(fileName);

        try (FileOutputStream fileOutputStream = new FileOutputStream(filePath.toString())) {
            fileOutputStream.write(byteArray);
        }
    }
}
