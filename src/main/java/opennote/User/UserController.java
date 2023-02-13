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


    record UserRequest(
            String username,
            String email,
            String password
    ) {}

    @PostMapping
    public void createUser(@RequestBody UserRequest request){
        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(request.password());
        userRepository.save(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@RequestBody UserRequest request, @PathVariable Integer id){

        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(request.username());
                    // user.setEmail(request.email());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id){
        userRepository.deleteById(id);
    }
}
