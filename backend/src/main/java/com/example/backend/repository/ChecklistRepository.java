package com.example.backend.repository;

import com.example.backend.domain.Checklist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChecklistRepository extends JpaRepository<Checklist, Long> { }
