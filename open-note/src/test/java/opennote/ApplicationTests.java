package opennote;

import com.fasterxml.jackson.databind.ObjectMapper;
import opennote.folder.Folder;
import opennote.note.Note;
import opennote.tag.NewTagRequest;
import opennote.tag.Tag;
import opennote.user.Role;
import opennote.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootTest
class ApplicationTests {

	public static List<Tag> emptyTagList = new ArrayList<>();
	public static List<NewTagRequest> emptyTagRequests = new ArrayList<>();
	public static List<Folder> emptyFolderList = new ArrayList<>();

	public static User user1 = new User(1, "Rayven Yor", "yrayven@gmail.com", "password1", Role.USER);
	public static User user2 = new User(2, "David Landup", "ldavid@gmail.com", "password2", Role.USER);
	public static User user3 = new User(3, "Jane Doe", "djane@gmail.com", "password3", Role.USER);

	public static Note note1 = new Note("12345", user1, emptyTagList, emptyFolderList,"MyNote", "https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png", "", true, new Date(), new Date(), 0);
	public static Note note2 = new Note("23456", user1, emptyTagList, emptyFolderList,"1181 Lecture", "http://lecture1181.pdf", "", false, new Date(), new Date(), 0);
	public static Note note3 = new Note("34567", user2,emptyTagList, emptyFolderList,"PHYS Lecture", "http://phys-test.pdf", "", true, new Date(), new Date(), 0);

	public static Folder folder1 = new Folder("12345", user1, "Title", new Date(), new Date());
	public static Folder folder2 = new Folder("23456", user1, "MATH Folder", new Date(), new Date());
	public static Folder folder3 = new Folder("34567", user2, "My project", new Date(), new Date());

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
