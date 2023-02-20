package opennote.folder.Request;

public record AddRemoveNoteRequest (
        String noteId,
        boolean isAdding
){
}
