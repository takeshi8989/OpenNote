package opennote;

import com.fasterxml.jackson.databind.ObjectMapper;
import opennote.User.User;
import opennote.User.UserController;
import opennote.User.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
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
public class UserAPITest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;

    @MockBean
    UserService userService;

    User user1 = new User(1, "Rayven Yor", "yrayven@gmail.com", "password1");
    User user2 = new User(2, "David Landup", "ldavid@gmail.com", "password2");
    User user3 = new User(3, "Jane Doe", "djane@gmail.com", "password3");

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
    public void createUser_success() throws Exception {
        record UserRequest(
                String username,
                String email,
                String password
        ) {}
        UserRequest user = new UserRequest(
                "Maricela Sandoval",
                "smaricela@gmail.com",
                "password4"
        );

        mockMvc.perform(MockMvcRequestBuilders
                        .post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(user)))
                .andExpect(status().isOk());
    }

    @Test
    public void updateUser_success() throws Exception {
        record UserRequest(
                String username,
                String email,
                String password
        ) {}
        UserRequest user = new UserRequest(
                "Dixie Montoya",
                "mdixie@gmail.com",
                "password5"
        );

        Mockito.when(userService.getUserById(user1.getId())).thenReturn(user1);
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(user)))
                .andExpect(status().isOk());
    }

    @Test
    public void delteUser_success() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .delete("/users/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    public static String toJson(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
