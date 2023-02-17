package opennote.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        // give more specific error
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public User createUser(UserRequest request){
        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(request.password());
        return userRepository.save(user);
    }

    public User updateUser(UserRequest request, @PathVariable Integer id){

        return userRepository.findById(id)
                .map(user -> {
                    user.setUsername(request.username());
                    // user.setEmail(request.email());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public void deleteUser(@PathVariable Integer id){
        userRepository.deleteById(id);
    }
}
