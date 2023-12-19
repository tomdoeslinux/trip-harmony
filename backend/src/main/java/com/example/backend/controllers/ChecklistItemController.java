package com.example.backend.controllers;

import com.example.backend.controllers.dtos.UpdateChecklistItemDTO;
import com.example.backend.domain.ChecklistItem;
import com.example.backend.repository.ChecklistItemRepository;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/checklist-items")
public class ChecklistItemController {

    private final ChecklistItemRepository checklistItemRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public ChecklistItemController(ChecklistItemRepository checklistItemRepository, ObjectMapper objectMapper) {
        this.checklistItemRepository = checklistItemRepository;
        this.objectMapper = objectMapper;
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UpdateChecklistItemDTO dto) {
        ChecklistItem checklistItem = checklistItemRepository.findById(id).orElseThrow();

        try {
            objectMapper.updateValue(checklistItem, dto);
        } catch (JsonMappingException ex) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().build();
    }
}
