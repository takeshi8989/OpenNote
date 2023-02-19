package opennote.Note;

import opennote.Folder.Folder;
import opennote.Folder.FolderService;
import opennote.User.User;
import opennote.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {
    private final NoteRepository noteRepository;
    private final UserService userService;
    private final FolderService folderService;

    @Autowired
    public NoteService(NoteRepository noteRepository, UserService userService, FolderService folderService) {
        this.noteRepository = noteRepository;
        this.userService = userService;
        this.folderService = folderService;
    }

    public List<Note> getAllNotes(){
        return noteRepository.findAll();
    }

    public Note getNoteById(String id){
        return noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
    }

    public List<Note> getNotesByUserId(Integer id){
        User user = userService.getUserById(id);
        return noteRepository.getNotesByUserId(id);
    }

    public List<Note> getNotesByFolderId(String id){
        Folder folder = folderService.getFolderById(id);
        return noteRepository.getNotesByFolderId(id);
    }

    public void createNote(NewNoteRequest request){
        Note note = new Note();
        note.setTitle(request.title());
        note.setUrl(request.url());
        note.setPublic(request.isPublic());
        noteRepository.save(note);
    }

    public Note updateNote(NewNoteRequest request, String id){
        return noteRepository.findById(id)
                .map(note -> {
                    note.setTitle(request.title());
                    note.setUrl(request.url());
                    note.setPublic(request.isPublic());
                    return noteRepository.save(note);
                })
                .orElseThrow(() -> new NoteNotFoundException(id));
    }

    public void deleteNote(String id){
        noteRepository.deleteById(id);
    }
}
