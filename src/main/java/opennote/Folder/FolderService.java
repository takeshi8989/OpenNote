package opennote.Folder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderService {
    @Autowired
    private FolderRepository folderRepository;

    public FolderService(FolderRepository folderRepository){
        this.folderRepository = folderRepository;
    }

    public List<Folder> getAllFolders(){
        return folderRepository.findAll();
    }
}
