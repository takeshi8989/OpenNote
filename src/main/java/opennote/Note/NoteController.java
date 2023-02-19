package opennote.Note;

import opennote.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("notes")
public class NoteController {
    private final NoteService noteService;

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

    @GetMapping(value = "/user/{userId}")
    public List<Note> getNotesByUserId(@PathVariable Integer userId){
        return noteService.getNotesByUserId(userId);
    }

    @GetMapping("/search/{query}")
    public List<Note> getNotesBySearch(@PathVariable String query){
        return noteService.getNotesBySearch(query);
    }

    @PostMapping
    public void createNote(@RequestBody NewNoteRequest request){
        noteService.createNote(request);
    }

    @PutMapping("/{id}")
    public Note updateNote(@RequestBody NewNoteRequest request, @PathVariable String id){
        return noteService.updateNote(request, id);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable String id){
        noteService.deleteNote(id);
    }
    

}
