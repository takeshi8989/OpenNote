package opennote.User;

import opennote.User.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getUsers(){
        return userRepository.findAll();
    }
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        // give more specific error
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }


    record NewUserRequest(
            String username,
            String email,
            String password
    ) {}

    @PostMapping
    public void createUser(@RequestBody NewUserRequest request){
        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(request.password());
        userRepository.save(user);
    }
}
