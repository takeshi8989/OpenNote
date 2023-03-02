package opennote;

import com.fasterxml.jackson.databind.ObjectMapper;
import opennote.folder.Folder;
import opennote.note.Note;
import opennote.user.Role;
import opennote.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;

@SpringBootTest
class ApplicationTests {

	public static User user1 = new User(1, "user1", "user1@gmail.com", "password1", Role.USER, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
	public static User user2 = new User(2, "user2", "user2@gmail.com", "password2", Role.USER, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
	public static User user3 = new User(3, "user3", "user3@gmail.com", "password3", Role.USER, new ArrayList<>(), new ArrayList<>(), new ArrayList<>());

	public static Note note1 = new Note();
	public static Note note2 = new Note();
	public static Note note3 = new Note();

	public static Folder folder1 = new Folder();
	public static Folder folder2 = new Folder();
	public static Folder folder3 = new Folder();

	@Test
	void contextLoads() {
	}

	public static String toJson(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
