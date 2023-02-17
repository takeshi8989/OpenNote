package opennote.User;

import opennote.Folder.FolderService;
import opennote.Folder.NewFolderRequest;
import opennote.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "users")
public class UserController {
    private final UserService userService;
    private final FolderService folderService;

    @Autowired
    public UserController(UserService userService, FolderService folderService) {
        this.userService = userService;
        this.folderService = folderService;
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
    public void createUser(@RequestBody UserRequest request){
        User user = userService.createUser(request);
        if(user != null){
            folderService.createFolder(new NewFolderRequest(user.getId(), "myfolder"));
        }
    }

    @PutMapping("/{id}")
    public User updateUser(@RequestBody UserRequest request, @PathVariable Integer id){
        return userService.updateUser(request, id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id){
        userService.deleteUser(id);
    }
}
