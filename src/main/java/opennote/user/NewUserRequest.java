package opennote.user;

public record NewUserRequest(
        String username,
        String email,
        String password) {}
