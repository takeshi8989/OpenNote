package opennote.folder;

import opennote.folder.Request.AddRemoveNoteRequest;
import opennote.folder.Request.NewFolderRequest;
import opennote.note.Note;
import opennote.note.NoteService;
import opennote.user.User;
import opennote.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService {
    @Autowired
    private final FolderRepository folderRepository;
    @Autowired
    private final UserService userService;
    @Autowired
    private final NoteService noteService;

    public FolderService(FolderRepository folderRepository, UserService userService, NoteService noteService) {
        this.folderRepository = folderRepository;
        this.userService = userService;
        this.noteService = noteService;
    }

    public List<Folder> getAllFolders(){
        return folderRepository.findAll();
    }

    public Folder getFolderById(String id){
        return folderRepository.findById(id)
                .orElseThrow(() -> new FolderNotFoundException(id));
    }

    public List<Folder> getFoldersByUsername(String username){
        return folderRepository.getFoldersByUsername(username);
    }

    public void createFolder(NewFolderRequest request){
        Folder folder = new Folder();
        User user = userService.getUserByUsername(request.username());
        folder.setTitle(request.title());
        folder.setUser(user);
        folderRepository.save(folder);
    }

    public Folder addOrRemoveNote(AddRemoveNoteRequest request, String folderId){
        Note note = noteService.getNoteById(request.noteId());
        Folder folder = this.getFolderById(folderId);
        if(request.isAdding()) {
            folder.addNote(note);
        } else{
            folder.removeNote(note);
        }
        return folderRepository.save(folder);
    }

    public Folder updateFolder(NewFolderRequest request, String id){
        return folderRepository.findById(id)
                .map(folder -> {
                    folder.setTitle(request.title());
                    return folderRepository.save(folder);
                })
                .orElseThrow(() -> new FolderNotFoundException(id));
    }

    public void deleteFolder(String id){
        folderRepository.deleteById(id);
    }
}
