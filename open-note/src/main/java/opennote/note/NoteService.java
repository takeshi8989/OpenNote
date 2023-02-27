package opennote.note;

import lombok.RequiredArgsConstructor;
import opennote.like.LikeService;
import opennote.tag.NewTagRequest;
import opennote.tag.TagService;
import opennote.user.User;
import opennote.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {
    @Autowired
    private final NoteRepository noteRepository;
    @Autowired
    private final UserService userService;
    @Autowired
    private final TagService tagService;
    @Autowired
    private final LikeService likeService;

    public List<Note> getAllNotes(){
        return noteRepository.findAll();
    }

    public List<Note> getRecentNotes(){
        return noteRepository.getRecentNotes();
    }

    public Note getNoteById(String id){
        return noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
    }

    public List<Note> getNotesByUserId(Integer userId){
        return noteRepository.getNotesByUserId(userId);
    }

    public List<Note> getNotesBySearch(String query){
        return noteRepository.getNotesBySearch(query);
    }

    public Note createNote(NewNoteRequest request){
        User user = userService.getUserByUsername(request.username());
        Note note = new Note();
        note.setUser(user);
        note.setTitle(request.title());
        note.setUrl(request.url());
        note.setDescription(request.description());
        note.setPublic(request.isPublic());
        noteRepository.save(note);
        addTags(note, request.tags());
        return note;
    }

    public void addTags(Note note, List<NewTagRequest> tags){
        for(NewTagRequest request: tags){
            tagService.createTag(request, note);
        }
    }

    public Note updateNote(NewNoteRequest request, String id){
        return noteRepository.findById(id)
                .map(note -> {
                    note.setTitle(request.title());
                    note.setUrl(request.url());
                    note.setDescription(request.description());
                    note.setPublic(request.isPublic());
                    return noteRepository.save(note);
                })
                .orElseThrow(() -> new NoteNotFoundException(id));
    }

    public Note toggleLike(String noteId, String username){
        Note note = getNoteById(noteId);
        User user = userService.getUserByUsername(username);
        likeService.toggleLike(note, user);
        return note;
    }

    public void deleteNote(String id){
        noteRepository.deleteById(id);
    }

    public void getDownloaded(Note note){
        note.incrementDownloadCount();
        noteRepository.save(note);
    }
}
