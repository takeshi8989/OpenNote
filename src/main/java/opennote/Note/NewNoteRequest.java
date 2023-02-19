package opennote.Note;

public record NewNoteRequest(
        Integer userId,
        String title,
        String url,
        boolean isPublic

) {
}
