package opennote.file;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import opennote.note.Note;
import opennote.note.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static java.net.HttpURLConnection.HTTP_OK;

@Service
@RequiredArgsConstructor
public class FileService implements FileHandler{
    private final AmazonS3 s3;
    @Autowired
    private final NoteService noteService;
    @Value("${s3.bucket.name}")
    private String bucketName;

    @Override
    public String saveFile(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        try {
            File file1 = convertMultiPartToFile(file);
            PutObjectResult putObjectResult = s3.putObject(bucketName, originalFileName, file1);
            putObjectResult.getContentMd5();
            return originalFileName;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<byte[]> downloadFile(String fileName) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", MediaType.ALL_VALUE);
        headers.add("Content-Disposition", "attachment; filename="+fileName);
        S3Object object = s3.getObject(bucketName, fileName);
        S3ObjectInputStream objectContent = object.getObjectContent();
        try {
            byte[] bytes = IOUtils.toByteArray(objectContent);
            return ResponseEntity.status(HTTP_OK).headers(headers).body(bytes);
        } catch (IOException e){
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<byte[]> downloadFileWithTitle(String fileName, String noteId) {
        Note note = noteService.getNoteById(noteId);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", MediaType.ALL_VALUE);
        headers.add("Content-Disposition", "attachment; filename="+note.getTitle()+".pdf");
        S3Object object = s3.getObject(bucketName, fileName);
        S3ObjectInputStream objectContent = object.getObjectContent();
        try {
            byte[] bytes = IOUtils.toByteArray(objectContent);
            noteService.getDownloaded(note);
            return ResponseEntity.status(HTTP_OK).headers(headers).body(bytes);
        } catch (IOException e){
            throw new RuntimeException(e);
        }
    }

    @Override
    public String deleteFile(String fileName) {
        s3.deleteObject(bucketName, fileName);
        return "File deleted";
    }

    @Override
    public List<String> listAllFiles() {
        ListObjectsV2Result listObjectsV2Result = s3.listObjectsV2(bucketName);
        return listObjectsV2Result.getObjectSummaries()
                .stream().map(S3ObjectSummary::getKey)
                .collect(Collectors.toList());
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
