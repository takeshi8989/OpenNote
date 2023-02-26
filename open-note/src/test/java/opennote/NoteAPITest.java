package opennote;

import com.fasterxml.jackson.databind.ObjectMapper;
import opennote.config.SecurityConfig;
import opennote.folder.Folder;
import opennote.note.NewNoteRequest;
import opennote.note.Note;
import opennote.note.NoteController;
import opennote.note.NoteService;
import opennote.tag.NewTagRequest;
import opennote.tag.Tag;
import opennote.user.Role;
import opennote.user.User;
import opennote.config.JwtAuthenticationFilter;
import opennote.config.JwtService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
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

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(NoteController.class)
@AutoConfigureMockMvc(addFilters = false)
public class NoteAPITest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;
    @MockBean
    NoteService noteService;
    @MockBean
    JwtAuthenticationFilter jwtAuthenticationFilter;
    @MockBean
    JwtService jwtService;
    @MockBean
    SecurityConfig securityConfig;

    List<Tag> emptyTagList = new ArrayList<>();
    List<NewTagRequest> emptyTagRequests = new ArrayList<>();
    List<Folder> emptyFolderList = new ArrayList<>();

    User user1 = ApplicationTests.user1;
    User user2 = ApplicationTests.user2;

    Note note1 = ApplicationTests.note1;
    Note note2 = ApplicationTests.note2;
    Note note3 = ApplicationTests.note3;

    @Test
    public void getAllNotes_success() throws Exception{
        List<Note> notes = new ArrayList<>(Arrays.asList(note1, note2, note3));
        Mockito.when(noteService.getAllNotes()).thenReturn(notes);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/notes/all")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));
    }

    @Test
    public void getRecentNotes_success() throws Exception{
        List<Note> notes = new ArrayList<>(Arrays.asList(note1, note2, note3));
        Mockito.when(noteService.getRecentNotes()).thenReturn(notes);

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
    public void getNotesByUserId_success() throws Exception{
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
    public void getNotesBySearch_success() throws Exception{
        List<Note> result = new ArrayList<>(Arrays.asList(note1, note3));
        Mockito.when(noteService.getNotesBySearch("lecture")).thenReturn(result);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/notes/search/lecture")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void createNote_success() throws Exception {
        NewTagRequest tag1 = new NewTagRequest("tag1", "blue");
        NewTagRequest tag2 = new NewTagRequest("tag2", "red");
        List<NewTagRequest> tags = new ArrayList<>(Arrays.asList(tag1, tag2));
        NewNoteRequest request = new NewNoteRequest("Rayven Yor","1160 Midterm", "http://midterm.pdf", "", tags, false);
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/notes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(ApplicationTests.toJson(request)))
                .andExpect(status().isOk());
    }

    @Test
    public void updateNote_success() throws  Exception {
        NewNoteRequest request = new NewNoteRequest("Rayven Yor","updated myNote", "http://updated.pdf", "", emptyTagRequests,true);

        Mockito.when(noteService.getNoteById(note3.getId())).thenReturn(note3);
        note3.setTitle("updated myNote");
        Mockito.when(noteService.updateNote(request, note3.getId())).thenReturn(note3);
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/notes/34567")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(ApplicationTests.toJson(request)))
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

