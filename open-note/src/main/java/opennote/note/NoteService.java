package opennote.note;

import lombok.RequiredArgsConstructor;
import opennote.folder.Folder;
import opennote.folder.FolderService;
import opennote.like.LikeService;
import opennote.note.Request.NewNoteRequest;
import opennote.tag.NewTagRequest;
import opennote.tag.Tag;
import opennote.tag.TagService;
import opennote.user.User;
import opennote.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
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
    @Autowired
    private final FolderService folderService;

    public List<Note> getAllNotes(){
        return noteRepository.findAll();
    }

    public List<Note> getDefaultNotes() {
        // recent, like, view, etc...
        return noteRepository.getMostViewedNotes();
    }

    public Note getNoteById(String id){
        return noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
    }

    public List<Note> getNotesByUsername(String username){
        return noteRepository.getNotesByUsername(username);
    }

    public List<Note> getNotesBySearch(String query){
        query = query.toLowerCase();
        String[] words = query.split("\\+");
        String w1 = words.length > 0 ? words[0] : "";
        String w2 = words.length > 1 ? words[1] : "";
        String w3 = words.length > 2 ? words[2] : "";
        String w4 = words.length > 3 ? words[3] : "";
        String w5 = words.length > 4 ? words[4] : "";
        return noteRepository.getNotesBySearch(w1, w2, w3, w4, w5);
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
        return note;
    }

    public void addToAllFolders(Note note, List<String> folderIds) {
        for (String id : folderIds) {
            folderService.addNote(note, id);
        }
    }

    public void updateFolders(Note note, List<String> folderIds){
        for(String folderId: folderIds){
            Folder folder = folderService.getFolderById(folderId);
            if(note.getFolders().indexOf(folder) == -1) {
                folderService.addNote(note, folderId);
            }
        }

        for(Folder folder: note.getFolders()){
            if(folderIds.indexOf(folder.getId()) == -1){
                folderService.removeNote(note, folder.getId());
            }
        }
        noteRepository.save(note);
    }

    public void deleteFromFolder(String noteId, String folderId){
        Note note = getNoteById(noteId);
        folderService.removeNote(note, folderId);
    }

    public void addTags(Note note, List<NewTagRequest> tags){
        for(NewTagRequest tag: tags){
            tagService.createTag(tag, note);
        }
    }

    public void removeOldTags(Note note, List<Tag> oldTags){
        for(Tag tag: oldTags){
            note.getTags().remove(tag);
            tagService.removeTag(tag);
        }
    }

    public void updateTags(Note note, List<NewTagRequest> tags){
        HashMap<String, Integer> newTagIds = new HashMap<>();
        List<NewTagRequest> newTags = new ArrayList<>();
        for(NewTagRequest tag: tags){
            if(tag.id().equals("")) newTags.add(tag);
            newTagIds.put(tag.id(), 1);
        }
        List<Tag> oldTags = new ArrayList<>();
        for(Tag tag: note.getTags()){
            if(newTagIds.get(tag.getId()) == null){
                oldTags.add(tag);
            }
        }

        addTags(note, newTags);
        removeOldTags(note, oldTags);
    }

    public Note updateNote(NewNoteRequest request, String id){
        return noteRepository.findById(id)
                .map(note -> {
                    note.setTitle(request.title());
                    note.setUrl(request.url());
                    note.setDescription(request.description());
                    note.setPublic(request.isPublic());
                    updateTags(note, request.tags());
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

    public void incrementView(String noteId){
        Note note = getNoteById(noteId);
        note.incrementViewsCount();
        noteRepository.save(note);
    }

    public void deleteNote(String id){
        noteRepository.deleteById(id);
    }

    public void getDownloaded(Note note){
        note.incrementDownloadCount();
        noteRepository.save(note);
    }
}
