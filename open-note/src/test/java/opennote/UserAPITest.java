package opennote;

import com.fasterxml.jackson.databind.ObjectMapper;
import opennote.config.SecurityConfig;
import opennote.folder.FolderService;
import opennote.user.*;
import opennote.config.JwtAuthenticationFilter;
import opennote.config.JwtService;
import opennote.user.requests.NewUserRequest;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
public class UserAPITest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;

    @MockBean
    UserService userService;
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
    User user3 = ApplicationTests.user3;

    @Test
    public void getAllUsers_success() throws Exception {
        List<User> users = new ArrayList<>(Arrays.asList(user1, user2, user3));
        Mockito.when(userService.getUsers()).thenReturn(users);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[2].username", is("user3")));
    }

    @Test
    public void getUserByUsername_success() throws Exception {
        user1.setUsername("user1");
        Mockito.when(userService.getUserByUsername(user1.getUsername())).thenReturn(user1);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/users/user1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("user1")));
    }

    @Test
    public void updateUser_success() throws Exception {
        NewUserRequest user = new NewUserRequest(
                "updated",
                "updated@gmail.com",
                "password4"
                ,""
        );

        Mockito.when(userService.getUserById(user1.getId())).thenReturn(user1);
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(ApplicationTests.toJson(user)))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteUser_success() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/users/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
