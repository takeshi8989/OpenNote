package opennote.Folder.Request;

public record AddRemoveNoteRequest (
        String noteId,
        boolean isAdding
){
}
