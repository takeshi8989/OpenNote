package opennote;

import com.fasterxml.jackson.databind.ObjectMapper;
import opennote.config.SecurityConfig;
import opennote.file.FileController;
import opennote.file.FileService;
import opennote.config.JwtAuthenticationFilter;
import opennote.config.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.io.InputStream;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(FileController.class)
@AutoConfigureMockMvc(addFilters = false)
public class FileAPITest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;
    @MockBean
    FileService fileService;
    @MockBean
    JwtAuthenticationFilter jwtAuthenticationFilter;
    @MockBean
    JwtService jwtService;
    @MockBean
    SecurityConfig securityConfig;

    @Test
    public void uploadFile_success() throws Exception {
        final InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("test.png");
        final MockMultipartFile file = new MockMultipartFile("test.png", "test.png", "image/png", inputStream);
        mockMvc.perform(MockMvcRequestBuilders
                .multipart("/files/upload")
                        .file("file", file.getBytes())
                .characterEncoding("UTF-8"))
                .andExpect(status().isOk());
    }

    @Test void deleteFile_success() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                .delete("/files/test.png"))
                .andExpect(status().isOk());
    }
}
