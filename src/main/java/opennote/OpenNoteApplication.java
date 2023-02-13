package opennote;

import java.util.List;

import opennote.User.User;
import opennote.User.UserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@RestController
@SpringBootApplication
public class OpenNoteApplication {
	public static void main(String[] args) {
		SpringApplication.run(OpenNoteApplication.class, args);
	}
}
