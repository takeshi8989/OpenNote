package opennote.File;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FileHandler {
    String saveFile(MultipartFile file);
    ResponseEntity<byte[]> downloadFile(String fileName);
    String deleteFile(String fileName);
    List<String> listAllFiles();
}
