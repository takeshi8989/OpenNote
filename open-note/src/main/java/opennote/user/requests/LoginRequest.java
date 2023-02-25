package opennote.user.requests;

public record LoginRequest(
        String username,
        String password) {
}
