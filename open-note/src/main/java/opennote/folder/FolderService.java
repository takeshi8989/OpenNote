package opennote.folder;

import lombok.RequiredArgsConstructor;
import opennote.folder.Request.NewFolderRequest;
import opennote.note.Note;
import opennote.note.NoteService;
import opennote.user.User;
import opennote.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FolderService {
    @Autowired
    private final FolderRepository folderRepository;
    @Autowired
    private final UserService userService;

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

    public Folder addNote(Note note, String folderId){
        Folder folder = this.getFolderById(folderId);
        folder.addNote(note);
        return folderRepository.save(folder);
    }

    public void removeNote(Note note, String folderId){
        Folder folder = this.getFolderById(folderId);
        folder.removeNote(note);
        folderRepository.save(folder);
    }

    public void createFolder(NewFolderRequest request){
        Folder folder = new Folder();
        User user = userService.getUserByUsername(request.username());
        folder.setTitle(request.title());
        folder.setUser(user);
        folderRepository.save(folder);
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
