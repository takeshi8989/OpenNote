package opennote.user.requests;

public record NewUserRequest(
        String username,
        String email,
        String password) {}
