package opennote.User;

public record UserRequest(
        String username,
        String email,
        String password) {}
