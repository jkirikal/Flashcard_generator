package org.flashcards.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.List;

@Service
public class PromptService {
    @Value("${api.url}")
    private String apiUrl;

    private final FileService fileService;

    public PromptService(FileService fileService) {
        this.fileService = fileService;
    }


    public ResponseEntity<String> createPrompt(MultipartFile materialsPDF, MultipartFile questionsFile) {
        try{
            String base = fileService.pdfToTextConverter(materialsPDF);
            String questions = fileService.convertMultipartFileToString(questionsFile);
            String apiKey = getApiKey();

            ResponseEntity<String> response = generateResponse(apiKey, base, questions);
            String jsonString = response.getBody();
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse JSON string to JsonNode
            JsonNode jsonNode = objectMapper.readTree(jsonString);
            String out = jsonNode.get("candidates").get(0).get("content").get("parts").get(0).get("text").asText().replaceAll("```json", "").replaceAll("```", "").trim();
            return new ResponseEntity<>(out, HttpStatus.OK);
        }  catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error processing files: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error parsing JSON response: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String getApiKey(){
        String apiKey = null;
        try {
            List<String> lines = Files.readAllLines(Paths.get(apiUrl));
            apiKey = lines.getFirst().trim();
        } catch (IOException e) {
            System.err.println("Error reading the API key from file: " + e.getMessage());
        }
        return apiKey;
    }

    private ResponseEntity<String> generateResponse(String apiKey, String base, String questions){
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;

        String jsonBody = "{ \"contents\": [ { \"parts\": [ { \"text\": \"You get a text file to analyze. Then I give you questions, for which you have to create flashcards for each of those questions. The flashcard answers should be in Estonian, precise and based only on the given text file and nothing else.\" }," +
                " { \"text\": \"input: 1. Milliseid kompartmente hõlmab raku sisemembraanide võrgustik?\\n2. Kirjelda karedapinnalist tsütoplasma võrgustikku. Mis on selle funktsioonid?\\n3. Kirjelda siledapinnalist tsütoplasma võrgustikku. Mis on selle funktsioonid?\" }," +
                " { \"text\": \"output: {    \\\"q-a_pairs\\\": [        {            \\\"question\\\": \\\"Milliseid kompartmente hõlmab raku sisemembraanide võrgustik?\\\",            \\\"answer\\\": \\\"Endoplasmaatiline retiikulum, Golgi aparaat, vakuool, lüsosoomid, peroksüsoomid.\\\"        }," +
                "        {            \\\"question\\\": \\\"Kirjelda karedapinnalist tsütoplasma võrgustikku. Mis on selle funktsioonid?\\\",            \\\"answer\\\": \\\"Karedapinnaline tsütoplasma võrgustik (RET) on membraanide võrgustik, mille pinnal on ribosoomid. RET osaleb valkude sünteesis, modifitseerimises ja transportimises.\\\"        }," +
                "        {            \\\"question\\\": \\\"Kirjelda siledapinnalist tsütoplasma võrgustikku. Mis on selle funktsioonid?\\\",            \\\"answer\\\": \\\"Siledapinnaline tsütoplasma võrgustik (SET) on membraanide võrgustik ilma ribosoomideta. SET osaleb lipiidide ja steroidide sünteesis, detoksifikatsioonis ja kaltsiumi ladustamises.\\\"        }    ]}\" }," +
                " { \"text\": \"input: Answer to my questions based only on this text: "+base+"\n\n The questions are: "+questions+"\" }," +
                " { \"text\": \"output: \" } ] } ], \"generationConfig\": { \"temperature\": 1, \"topK\": 64, \"topP\": 0.95, \"maxOutputTokens\": 8192, \"stopSequences\": [] }," +
                " \"safetySettings\": [ { \"category\": \"HARM_CATEGORY_HARASSMENT\", \"threshold\": \"BLOCK_MEDIUM_AND_ABOVE\" }," +
                " { \"category\": \"HARM_CATEGORY_HATE_SPEECH\", \"threshold\": \"BLOCK_MEDIUM_AND_ABOVE\" }," +
                " { \"category\": \"HARM_CATEGORY_SEXUALLY_EXPLICIT\", \"threshold\": \"BLOCK_MEDIUM_AND_ABOVE\" }," +
                " { \"category\": \"HARM_CATEGORY_DANGEROUS_CONTENT\", \"threshold\": \"BLOCK_MEDIUM_AND_ABOVE\" } ] }";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.exchange(url, HttpMethod.POST, request, String.class);
    }
}
