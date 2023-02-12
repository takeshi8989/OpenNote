package opennote;

import java.util.List;

import opennote.User.User;
import opennote.User.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@RestController
@SpringBootApplication
@RequestMapping(value = "/api/v1/users")
public class OpenNoteApplication {

	private final UserRepository userRepository;

	public OpenNoteApplication(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(OpenNoteApplication.class, args);
	}

	@GetMapping
	public List<User> getUsers(){
		return userRepository.findAll();
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
