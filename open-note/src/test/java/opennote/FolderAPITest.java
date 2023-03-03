package opennote;

import com.fasterxml.jackson.databind.ObjectMapper;
import opennote.config.SecurityConfig;
import opennote.folder.Folder;
import opennote.folder.FolderController;
import opennote.folder.FolderService;
import opennote.folder.Request.AddRemoveNoteRequest;
import opennote.folder.Request.NewFolderRequest;
import opennote.note.Note;
import opennote.user.User;
import opennote.config.JwtAuthenticationFilter;
import opennote.config.JwtService;
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
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FolderController.class)
@AutoConfigureMockMvc(addFilters = false)
public class FolderAPITest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;
    @MockBean
    FolderService folderService;
    @MockBean
    JwtAuthenticationFilter jwtAuthenticationFilter;
    @MockBean
    JwtService jwtService;
    @MockBean
    SecurityConfig securityConfig;



    User user1 = ApplicationTests.user1;
    User user2 = ApplicationTests.user2;
    Note note1 = ApplicationTests.note1;

    Folder folder1 = ApplicationTests.folder1;
    Folder folder2 = ApplicationTests.folder2;
    Folder folder3 = ApplicationTests.folder3;

    @Test
    public void getAllFolders_success() throws Exception {
        folder2.setTitle("folder2");
        List<Folder> folders = new ArrayList<>(Arrays.asList(folder1, folder2, folder3));

        Mockito.when(folderService.getAllFolders()).thenReturn(folders);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/folders")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[1].title", is("folder2")));
    }

    @Test
    public void getFolderById_success() throws Exception{
        folder1.setId("12345");
        folder1.setTitle("Title");
        Mockito.when(folderService.getFolderById(folder1.getId())).thenReturn(folder1);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/folders/12345")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.title", is("Title")));
    }

    @Test
    public void getFoldersByUsername_success() throws Exception{
        folder2.setTitle("MATH Folder");
        user1.setId(1);
        List<Folder> folders = new ArrayList<>(Arrays.asList(folder1, folder2));
        Mockito.when(folderService.getFoldersByUsername(user1.getUsername())).thenReturn(folders);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/folders/user/user1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[1].title", is("MATH Folder")));
    }

    @Test
    public void createFolder_success() throws Exception{
        NewFolderRequest request = new NewFolderRequest("user1", "Favorite movies");
        mockMvc.perform(MockMvcRequestBuilders
                        .post("/folders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(ApplicationTests.toJson(request)))
                .andExpect(status().isOk());
    }

    @Test
    public void updateFolder_success() throws  Exception{
        NewFolderRequest request = new NewFolderRequest("user2", "Favorite anime");
        folder3.setId("34567");
        folder3.setTitle("Favorite anime");
        Mockito.when(folderService.getFolderById(folder3.getId())).thenReturn(folder3);

        Mockito.when(folderService.updateFolder(request, folder3.getId())).thenReturn(folder3);
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/folders/34567")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(ApplicationTests.toJson(request)))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Favorite anime"));
    }

    @Test
    public void deleteFolder_success() throws Exception{
        folder1.setId("12345");
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/folders/12345")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
