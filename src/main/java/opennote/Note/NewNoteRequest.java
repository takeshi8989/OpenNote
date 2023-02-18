package opennote.Note;

public record NewNoteRequest(
        String title,
        String url,
        boolean isPublic
) {
}
