package opennote.Note;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("notes")
public class NoteController {
    private NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public List<Note> getAllNotes(){
        return noteService.getAllNotes();
    }

    @GetMapping(value = "/{id}")
    public Note getNoteById(@PathVariable String id){
        return noteService.getNoteById(id);
    }

    @PostMapping
    public void createNote(@RequestBody NewNoteRequest request){
        noteService.createNote(request);
    }
}
