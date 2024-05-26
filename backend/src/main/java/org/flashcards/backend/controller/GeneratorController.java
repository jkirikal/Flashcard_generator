package org.flashcards.backend.controller;

import org.flashcards.backend.service.PromptService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class GeneratorController {
    private final PromptService promptService;

    public GeneratorController(PromptService promptService) {
        this.promptService = promptService;
    }

    @PostMapping("api/fileU/upload")
    public ResponseEntity<String> uploadData(@RequestParam("file1") MultipartFile materialsPDF,
                                             @RequestParam("file2") MultipartFile questionsTXT){
        return promptService.createPrompt(materialsPDF, questionsTXT);
        
    }
}
