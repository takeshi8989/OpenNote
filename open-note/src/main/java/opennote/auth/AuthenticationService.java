package opennote.auth;

import lombok.RequiredArgsConstructor;
import opennote.folder.FolderService;
import opennote.folder.Request.NewFolderRequest;
import opennote.user.*;
import opennote.config.JwtService;
import opennote.user.requests.LoginRequest;
import opennote.user.requests.NewUserRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final FolderService folderService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse signup(NewUserRequest request) {
        User user = userService.createUser(request);
        folderService.createFolder(new NewFolderRequest(user.getId(), "myfolder"));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );
        User user = userService.getUserByUsername(request.username());
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
