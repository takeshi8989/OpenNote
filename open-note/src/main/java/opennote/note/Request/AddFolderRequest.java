package opennote.note.Request;

import java.util.List;

public record AddFolderRequest(
        List<String> folderIds
) {
}
