package opennote.services;

import opennote.user.*;
import opennote.user.requests.NewUserRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetUsers() {
        // Setup mock repository
        List<User> userList = new ArrayList<>();
        User user1 = new User();
        user1.setId(1);
        user1.setUsername("john_doe");
        user1.setEmail("john_doe@example.com");
        userList.add(user1);
        User user2 = new User();
        user2.setId(2);
        user2.setUsername("jane_doe");
        user2.setEmail("jane_doe@example.com");
        userList.add(user2);
        when(userRepository.findAll()).thenReturn(userList);

        // Call method being tested
        List<User> result = userService.getUsers();

        // Verify result
        assertEquals(2, result.size());
        assertEquals(user1.getUsername(), result.get(0).getUsername());
        assertEquals(user2.getUsername(), result.get(1).getUsername());
    }

    @Test
    public void testGetUserById() {
        // Setup mock repository
        int userId = 1;
        User user = new User();
        user.setId(userId);
        user.setUsername("john_doe");
        user.setEmail("john_doe@example.com");
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        // Call method being tested
        User result = userService.getUserById(userId);

        // Verify result
        assertEquals(user.getUsername(), result.getUsername());
        assertEquals(user.getEmail(), result.getEmail());
    }

    @Test
    public void testGetUserByIdNotFound() {
        // Setup mock repository
        int userId = 1;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        // Call method being tested and verify exception
        assertThrows(UserNotFoundException.class, () -> {
            userService.getUserById(userId);
        });
    }

    @Test
    public void testGetUserByUsername() {
        // Setup mock repository
        String username = "john_doe";
        User user = new User();
        user.setId(1);
        user.setUsername(username);
        user.setEmail("john_doe@example.com");
        when(userRepository.getUserByUsername(username)).thenReturn(user);

        // Call method being tested
        User result = userService.getUserByUsername(username);

        // Verify result
        assertEquals(user.getUsername(), result.getUsername());
        assertEquals(user.getEmail(), result.getEmail());
    }

    @Test
    public void testCreateUser() {
        // Setup mock repository
        NewUserRequest newUserRequest = new NewUserRequest(
                "john_doe", "john_doe@example.com", "password", "");
        when(passwordEncoder.encode(newUserRequest.password())).thenReturn("encrypted_password");
        User savedUser = new User();
        savedUser.setId(1);
        savedUser.setUsername(newUserRequest.username());
        savedUser.setEmail(newUserRequest.email());
        savedUser.setPassword("encrypted_password");
        savedUser.setRole(Role.USER);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // Call method being tested
        User result = userService.createUser(newUserRequest);

        // Verify result
        assertEquals(savedUser.getUsername(), result.getUsername());
    }

    @Test
    void testDeleteUser() {
        Integer userId = 1;
        doNothing().when(userRepository).deleteById(userId);
        userService.deleteUser(userId);
        verify(userRepository, times(1)).deleteById(userId);
    }
}
