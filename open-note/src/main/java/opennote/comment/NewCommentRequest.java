package opennote.comment;

public record NewCommentRequest(
        String content,
        String username,
        String noteId
) {
}
