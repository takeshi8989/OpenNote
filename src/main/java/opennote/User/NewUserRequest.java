package opennote.User;

public record NewUserRequest(
        String username,
        String email,
        String password) {}
