package opennote.folder;

public class FolderNotFoundException extends RuntimeException{
    public FolderNotFoundException(String id) {
        super("Could not find folder " + id);
    }
}
