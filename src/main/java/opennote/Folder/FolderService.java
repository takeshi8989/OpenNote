package opennote.Folder;

import opennote.Note.Note;
import opennote.Note.NoteService;
import opennote.User.User;
import opennote.User.UserNotFoundException;
import opennote.User.UserService;
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

    public List<Folder> getFoldersByUserId(Integer userId){
        return folderRepository.getFoldersByUserId(userId);
    }

    public void createFolder(NewFolderRequest request){
        Folder folder = new Folder();
        User user = userService.getUserById(request.userId());
        folder.setTitle(request.title());
        folder.setUser(user);
        folderRepository.save(folder);
    }

    public Folder addNote(AddRemoveNoteRequest request, String folderId){
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
