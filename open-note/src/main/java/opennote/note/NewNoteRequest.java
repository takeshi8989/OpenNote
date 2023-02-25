package opennote.note;

public record NewNoteRequest(
        String username,
        String title,
        String url,
        boolean isPublic

) {
}
