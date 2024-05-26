package org.flashcards.backend.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

@Service
public class FileService {
    private static final String UPLOAD_DIR = "uploads/";
    public String pdfToTextConverter(MultipartFile file) throws IOException {
        // Save the uploaded file to a temporary location
        Path tempFile = Files.createTempFile(Paths.get(UPLOAD_DIR), null, ".pdf");
        Files.write(tempFile, file.getBytes());

        StringBuilder text = new StringBuilder();
        try (PDDocument document = PDDocument.load(tempFile.toFile())) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            text.append(pdfStripper.getText(document));
        } catch (IOException e) {
            e.printStackTrace();
            return "Error reading PDF file: " + e.getMessage();
        } finally {
            // Delete the temporary file
            Files.delete(tempFile);
        }
        return text.toString();
    }
    public String convertMultipartFileToString(MultipartFile file) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            return reader.lines().collect(Collectors.joining("\n"));
        }
    }
}
