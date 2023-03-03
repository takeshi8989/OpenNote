package opennote.note;

import lombok.RequiredArgsConstructor;
import opennote.folder.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("notes")
@RequiredArgsConstructor
public class NoteController {
    @Autowired
    private final NoteService noteService;

    @GetMapping("/all")
    public List<Note> getAllNotes(){
        return noteService.getAllNotes();
    }

    @GetMapping
    public List<Note> getRecentNotes(){
        return noteService.getRecentNotes();
    }

    @GetMapping(value = "/{id}")
    public Note getNoteById(@PathVariable String id){
        return noteService.getNoteById(id);
    }

    @GetMapping(value = "/user/{username}")
    public List<Note> getNotesByUsername(@PathVariable String username){
        return noteService.getNotesByUsername(username);
    }

    @GetMapping("/search/{query}")
    public List<Note> getNotesBySearch(@PathVariable String query){
        return noteService.getNotesBySearch(query);
    }

    @PostMapping
    public Note createNote(@RequestBody NewNoteRequest request){
        Note note = noteService.createNote(request);
        noteService.addTags(note, request.tags());
        noteService.addToAllFolders(note, request.folderIds());
        return note;
    }


    @PutMapping("/{id}")
    public Note updateNote(@RequestBody NewNoteRequest request, @PathVariable String id){
        return noteService.updateNote(request, id);
    }

    @PutMapping("/like/{noteId}/{username}")
    public Note toggleLike(@PathVariable String noteId, @PathVariable String username){
        return noteService.toggleLike(noteId, username);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable String id){
        noteService.deleteNote(id);
    }


}
