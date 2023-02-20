package opennote.folder;

import opennote.folder.Request.AddRemoveNoteRequest;
import opennote.folder.Request.NewFolderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "folders")
public class FolderController {

    private final FolderService folderService;

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

    @GetMapping("/user/{userId}")
    public List<Folder> getFoldersByUserId(@PathVariable Integer userId){
        return folderService.getFoldersByUserId(userId);
    }

    @PostMapping
    public void createFolder(@RequestBody NewFolderRequest request){
        folderService.createFolder(request);
    }

    @PutMapping(value = "/{id}")
    public Folder updateFolder(@RequestBody NewFolderRequest request, @PathVariable String id){
        return folderService.updateFolder(request, id);
    }

    @PutMapping( value = "/note/{folderId}")
    public Folder addNote(@RequestBody AddRemoveNoteRequest request, @PathVariable String folderId){
        return folderService.addOrRemoveNote(request, folderId);
    }

    @DeleteMapping("/{id}")
    public void deleteFolder(@PathVariable String id){
        folderService.deleteFolder(id);
    }
}
