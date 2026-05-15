package com.kuikops.notes;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/notes")
public class NoteController {
    private List<Map<String, String>> notes = new ArrayList<>();

    @GetMapping
    public List<Map<String, String>> getNotes() { return notes; }

    @PostMapping
    public void addNote(@RequestBody Map<String, String> note) { notes.add(note); }
}