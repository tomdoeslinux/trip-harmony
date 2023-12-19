package com.example.backend.controllers;

import com.example.backend.domain.ChecklistItem;
import com.example.backend.services.ChecklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checklists")
public class ChecklistController {

    private final ChecklistService checklistService;

    @Autowired
    public ChecklistController(ChecklistService checklistService) {
        this.checklistService = checklistService;
    }

    @PostMapping("/{id}/items")
    public void addChecklistItem(@PathVariable Long id, @RequestBody ChecklistItem checklistItem) {
        checklistService.addChecklistItem(id, checklistItem);
    }
}
