package opennote.services;

import opennote.folder.FolderService;
import opennote.like.LikeService;
import opennote.note.Note;
import opennote.note.NoteRepository;
import opennote.note.NoteService;
import opennote.tag.TagService;
import opennote.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class NoteServiceTest {

    private NoteService noteService;

    @Mock
    private NoteRepository noteRepository;

    @Mock
    private UserService userService;

    @Mock
    private TagService tagService;

    @Mock
    private LikeService likeService;

    @Mock
    private FolderService folderService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        noteService = new NoteService(noteRepository, userService, tagService, likeService, folderService);
    }

    @Test
    public void testGetAllNotes() {
        List<Note> expectedNotes = new ArrayList<>();
        expectedNotes.add(new Note());
        expectedNotes.add(new Note());
        when(noteRepository.findAll()).thenReturn(expectedNotes);

        List<Note> actualNotes = noteService.getAllNotes();

        assertEquals(expectedNotes, actualNotes);
    }

    @Test
    public void testGetDefaultNotes() {
        List<Note> expectedNotes = new ArrayList<>();
        expectedNotes.add(new Note());
        expectedNotes.add(new Note());
        when(noteRepository.getMostViewedNotes()).thenReturn(expectedNotes);

        List<Note> actualNotes = noteService.getDefaultNotes();

        assertEquals(expectedNotes, actualNotes);
    }

    @Test
    public void testGetNoteById() {
        String id = "note_id";
        Note expectedNote = new Note();
        when(noteRepository.findById(id)).thenReturn(java.util.Optional.of(expectedNote));

        Note actualNote = noteService.getNoteById(id);

        assertEquals(expectedNote, actualNote);
    }

    @Test
    public void testGetNotesByUsername() {
        String username = "user";
        List<Note> expectedNotes = new ArrayList<>();
        expectedNotes.add(new Note());
        expectedNotes.add(new Note());
        when(noteRepository.getNotesByUsername(username)).thenReturn(expectedNotes);

        List<Note> actualNotes = noteService.getNotesByUsername(username);

        assertEquals(expectedNotes, actualNotes);
    }

    @Test
    public void testGetNotesBySearch() {
        String query = "query";
        List<Note> expectedNotes = new ArrayList<>();
        expectedNotes.add(new Note());
        expectedNotes.add(new Note());
        when(noteRepository.getNotesBySearch(any(), any(), any(), any(), any())).thenReturn(expectedNotes);

        List<Note> actualNotes = noteService.getNotesBySearch(query);

        assertEquals(expectedNotes, actualNotes);
    }

}
