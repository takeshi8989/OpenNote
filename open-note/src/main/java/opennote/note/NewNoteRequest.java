package opennote.note;

public record NewNoteRequest(
        Integer userId,
        String title,
        String url,
        boolean isPublic

) {
}
