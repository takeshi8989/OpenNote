package opennote.user;

import opennote.user.requests.NewUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "users")
public class UserController {
    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers(){
        return userService.getUsers();
    }
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        // give more specific error
        return userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody NewUserRequest request){
        return userService.createUser(request);
    }

    @PutMapping("/{id}")
    public User updateUser(@RequestBody NewUserRequest request, @PathVariable Integer id){
        return userService.updateUser(request, id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id){
        userService.deleteUser(id);
    }
}
