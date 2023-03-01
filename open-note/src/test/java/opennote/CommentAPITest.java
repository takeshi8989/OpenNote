package opennote;

import com.fasterxml.jackson.databind.ObjectMapper;
import opennote.comment.Comment;
import opennote.comment.CommentController;
import opennote.comment.CommentService;
import opennote.comment.NewCommentRequest;
import opennote.config.JwtAuthenticationFilter;
import opennote.config.JwtService;
import opennote.config.SecurityConfig;
import opennote.note.NewNoteRequest;
import opennote.note.Note;
import opennote.tag.NewTagRequest;
import opennote.user.User;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CommentController.class)
@AutoConfigureMockMvc(addFilters = false)
public class CommentAPITest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;
    @MockBean
    CommentService commentService;

    @MockBean
    JwtAuthenticationFilter jwtAuthenticationFilter;
    @MockBean
    JwtService jwtService;
    @MockBean
    SecurityConfig securityConfig;

    User user1 = ApplicationTests.user1;
    Note note1 = ApplicationTests.note1;

    @Test
    public void createComment_success() throws Exception {
        NewCommentRequest request = new NewCommentRequest("Nice Note!", user1.getUsername(), note1.getId());

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/comments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(ApplicationTests.toJson(request)))
                .andExpect(status().isOk());
    }

    @Test
    public void updateComment_success() throws Exception {
        NewCommentRequest request = new NewCommentRequest("Updated Comment", user1.getUsername(), note1.getId());
        Comment comment1 = new Comment();
        comment1.setId("123");
        comment1.setContent("Updated Comment");
        Mockito.when(commentService.updateComment(comment1.getId(), request)).thenReturn(comment1);
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/comments/123")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(ApplicationTests.toJson(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value("Updated Comment"));
    }

    @Test
    public void deleteComment_success() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/comments/123")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
