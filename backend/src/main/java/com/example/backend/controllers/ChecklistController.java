package com.example.backend.controllers;

import com.example.backend.domain.Checklist;
import com.example.backend.domain.ChecklistItem;
import com.example.backend.repository.ChecklistItemRepository;
import com.example.backend.repository.ChecklistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checklists")
public class ChecklistController {

    private final ChecklistRepository checklistRepository;

    private final ChecklistItemRepository checklistItemRepository;

    @Autowired
    public ChecklistController(ChecklistRepository checklistRepository, ChecklistItemRepository checklistItemRepository) {
        this.checklistRepository = checklistRepository;
        this.checklistItemRepository = checklistItemRepository;
    }

    @PostMapping("/{id}/items")
    public void addChecklistItem(@PathVariable Long id, @RequestBody ChecklistItem checklistItem) {
        Checklist checklist = checklistRepository.findById(id).orElseThrow();
        checklistItem.setChecklist(checklist);
        checklistItemRepository.save(checklistItem);
    }
}
