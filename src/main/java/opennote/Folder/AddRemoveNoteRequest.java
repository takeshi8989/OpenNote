package opennote.Folder;

public record AddRemoveNoteRequest (
        String noteId,
        boolean isAdding
){
}
