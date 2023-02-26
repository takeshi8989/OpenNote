package opennote.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "files")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file){
        return fileService.saveFile(file);
    }

    @GetMapping("/download/{fileName}/{title}")
    public ResponseEntity<byte[]> download(@PathVariable String fileName, @PathVariable String title){
        return fileService.downloadFileWithTitle(fileName, title);
    }

    @DeleteMapping("/{fileName}")
    public String deleteFile(@PathVariable String fileName){
        return fileService.deleteFile(fileName);
    }

    @GetMapping()
    public List<String> getAllFiles(){
        return fileService.listAllFiles();
    }
}
