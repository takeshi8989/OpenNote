package opennote.Folder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "folders")
public class FolderController {
    private FolderService folderService;

    @Autowired
    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping
    public List<Folder> getAllFolders(){
        return folderService.getAllFolders();
    }

    @GetMapping(value = "/{id}")
    public Folder getFolderById(@PathVariable String id){
        return folderService.getFolderById(id);
    }

    @PostMapping
    public void createFolder(@RequestBody NewFolderRequest request){
        folderService.createFolder(request);
    }
}
