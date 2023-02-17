package opennote.Folder;

import opennote.User.User;
import opennote.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FolderService {
    private FolderRepository folderRepository;
    private UserService userService;

    @Autowired
    public FolderService(FolderRepository folderRepository, UserService userService) {
        this.folderRepository = folderRepository;
        this.userService = userService;
    }

    public List<Folder> getAllFolders(){
        return folderRepository.findAll();
    }

    public void createFolder(NewFolderRequest request){
        Folder folder = new Folder();
        User user = userService.getUserById(request.user_id());
        folder.setTitle(request.title());
        folder.setUser(user);
        folderRepository.save(folder);
    }
}
