package com.example.backend.services;

import com.example.backend.domain.Checklist;
import com.example.backend.domain.ChecklistItem;
import com.example.backend.repository.ChecklistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ChecklistService {

    private final ChecklistRepository checklistRepository;

    @Autowired
    public ChecklistService(ChecklistRepository checklistRepository) {
        this.checklistRepository = checklistRepository;
    }

    public void addChecklistItem(Long id, ChecklistItem checklistItem) {
        Checklist checklist = checklistRepository.findById(id).orElseThrow();
        checklist.getItems().add(checklistItem);
        checklistItem.setChecklist(checklist);

        checklistRepository.save(checklist);
    }
}
