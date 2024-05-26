package org.flashcards.backend.controller;

import org.flashcards.backend.service.PromptService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "https://flashcard-generator-ruddy.vercel.app")
public class GeneratorController {
    private final PromptService promptService;
    private static final Logger logger = LoggerFactory.getLogger(GeneratorController.class);


    public GeneratorController(PromptService promptService) {
        this.promptService = promptService;
    }

    @PostMapping("api/file/upload")
    public ResponseEntity<String> uploadData(@RequestParam("file1") MultipartFile materialsPDF,
                                             @RequestParam("file2") MultipartFile questionsTXT){
        ResponseEntity<String> response = promptService.createPrompt(materialsPDF, questionsTXT);
        logger.info("Successful request");
        return response;
    }
}
