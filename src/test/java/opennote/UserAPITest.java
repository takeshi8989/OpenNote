package opennote;

import com.fasterxml.jackson.databind.ObjectMapper;
import opennote.folder.FolderService;
import opennote.user.*;
import opennote.config.JwtAuthenticationFilter;
import opennote.config.JwtService;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
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
    @Mock
    JwtService jwtService;

    User user1 = new User(1, "Rayven Yor", "yrayven@gmail.com", "password1", Role.USER);
    User user2 = new User(2, "David Landup", "ldavid@gmail.com", "password2", Role.USER);
    User user3 = new User(3, "Jane Doe", "djane@gmail.com", "password3", Role.USER);

    @Test
    public void getAllUsers_success() throws Exception {

        List<User> users = new ArrayList<>(Arrays.asList(user1, user2, user3));
        Mockito.when(userService.getUsers()).thenReturn(users);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/users")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[2].username", is("Jane Doe")));
    }

    @Test
    public void getUserById_success() throws Exception {
        Mockito.when(userService.getUserById(user1.getId())).thenReturn(user1);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/users/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.username", is("Rayven Yor")));
    }

    @Test
    public void updateUser_success() throws Exception {
        NewUserRequest user = new NewUserRequest(
                "Dixie Montoya",
                "mdixie@gmail.com",
                "password5"
        );

        Mockito.when(userService.getUserById(user1.getId())).thenReturn(user1);
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(ApplicationTests.toJson(user)))
                .andExpect(status().isOk());
    }

    @Test
    public void delteUser_success() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/users/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
