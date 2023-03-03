package opennote.note.Request;

import opennote.tag.NewTagRequest;

import java.util.List;
public record NewNoteRequest(
        String username,
        String title,
        String url,
        String description,
        List<NewTagRequest> tags,
        List<String> folderIds,
        boolean isPublic

) {
}
