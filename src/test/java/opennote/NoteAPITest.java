package opennote;

import com.fasterxml.jackson.databind.ObjectMapper;
import opennote.Folder.Folder;
import opennote.Folder.NewFolderRequest;
import opennote.Note.NewNoteRequest;
import opennote.Note.Note;
import opennote.Note.NoteController;
import opennote.Note.NoteService;
import opennote.User.User;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static net.bytebuddy.matcher.ElementMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(NoteController.class)
public class NoteAPITest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @MockBean
    NoteService noteService;

    User user1 = new User(1, "Rayven Yor", "yrayven@gmail.com", "password1");
    User user2 = new User(2, "David Landup", "ldavid@gmail.com", "password2");

    Note note1 = new Note("12345", user1, "MyNote", "https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png", true, new Date(), new Date());
    Note note2 = new Note("23456", user1, "1181 Lecture", "http://lecture1181.pdf", false, new Date(), new Date());
    Note note3 = new Note("34567", user2,"PHYS Test", "http://phys-test.pdf", true, new Date(), new Date());


    @Test
    public void getAllNotes_success() throws Exception{
        List<Note> notes = new ArrayList<>(Arrays.asList(note1, note2, note3));
        Mockito.when(noteService.getAllNotes()).thenReturn(notes);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/notes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));
    }

    @Test
    public void getNoteById_success() throws Exception{
        Mockito.when(noteService.getNoteById(note1.getId())).thenReturn(note1);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/notes/12345")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.title", Matchers.is("MyNote")));
    }

    @Test
    public void getFoldersByUserId_success() throws Exception{
        List<Note> notes = new ArrayList<>(Arrays.asList(note1, note2));
        Mockito.when(noteService.getNotesByUserId(user1.getId())).thenReturn(notes);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/notes/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[1].title", Matchers.is("1181 Lecture")));
    }

    @Test
    public void createNote_success() throws Exception {
        NewNoteRequest request = new NewNoteRequest("1160 Midterm", "http://midterm.pdf", false);
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/notes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(OpenNoteApplicationTests.toJson(request)))
                .andExpect(status().isOk());
    }

    @Test
    public void updateNote_success() throws  Exception {
        NewNoteRequest request = new NewNoteRequest("updated myNote", "http://updated.pdf", true);

        Mockito.when(noteService.getNoteById(note3.getId())).thenReturn(note3);
        note3.setTitle("updated myNote");
        Mockito.when(noteService.updateNote(request, note3.getId())).thenReturn(note3);
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/notes/34567")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(OpenNoteApplicationTests.toJson(request)))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("updated myNote"));
    }

    @Test
    public void deleteNote_success() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/notes/12345")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}

