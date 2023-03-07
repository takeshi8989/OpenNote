package opennote.note;

import lombok.RequiredArgsConstructor;
import opennote.file.FileService;
import opennote.note.Request.AddFolderRequest;
import opennote.note.Request.NewNoteRequest;
import opennote.tag.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("notes")
@RequiredArgsConstructor
public class NoteController {

    @Value("${s3.bucket.name}")
    private String bucketName;

    @Value ("${s3.region.name}")
    private String region;

    @Autowired
    private final NoteService noteService;
    @Autowired
    private final FileService fileService;
    @Autowired
    private final TagService tagService;
    @GetMapping("/all")
    public List<Note> getAllNotes(){
        return noteService.getAllNotes();
    }

    @GetMapping
    public List<Note> getDefaultNotes(){
        return noteService.getDefaultNotes();
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

    @PostMapping("/folder/{noteId}")
    public void updateFolders(@PathVariable String noteId, @RequestBody AddFolderRequest request){
        Note note = noteService.getNoteById(noteId);
        noteService.updateFolders(note, request.folderIds());
    }

    @PutMapping("/{id}")
    public Note updateNote(@RequestBody NewNoteRequest request, @PathVariable String id){
        return noteService.updateNote(request, id);
    }

    @PutMapping("/like/{noteId}/{username}")
    public Note toggleLike(@PathVariable String noteId, @PathVariable String username){
        return noteService.toggleLike(noteId, username);
    }

    @PutMapping("/view/{noteId}")
    public void incrementView(@PathVariable String noteId){
        noteService.incrementView(noteId);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable String id){
        Note note = noteService.getNoteById(id);
        String domain = "https://" + bucketName + ".s3." + region + ".amazonaws.com/";
        fileService.deleteFile(note.getUrl().substring(domain.length()));
        tagService.deleteTagsFromNote(id);
        noteService.deleteNote(id);
    }

    @DeleteMapping("/folder/{noteId}/{folderId}")
    public void deleteFromFolder(@PathVariable String noteId, @PathVariable String folderId){
        noteService.deleteFromFolder(noteId, folderId);
    }

}
