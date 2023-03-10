package opennote.services;

import opennote.note.Note;
import opennote.tag.NewTagRequest;
import opennote.tag.Tag;
import opennote.tag.TagRepository;
import opennote.tag.TagService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
public class TagServiceTest {

    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private TagService tagService;

    @Captor
    private ArgumentCaptor<Tag> tagArgumentCaptor;

    @Test
    public void testCreateTag() {
        Note note = new Note();
        note.setId("12345");

        NewTagRequest request = new NewTagRequest("", "testTag", "blue");

        Tag tag = new Tag();
        tag.setId("tagId");
        tag.setName(request.name());
        tag.setColor(request.color());
        tag.setNote(note);

        when(tagRepository.save(any(Tag.class))).thenReturn(tag);

        Tag result = tagService.createTag(request, note);

        verify(tagRepository, times(1)).save(any(Tag.class));
        assertEquals(tag, result);
    }

    @Test
    public void testRemoveTag() {
        Tag tag = new Tag();
        tag.setId("tagId");
        tag.setName("testTag");
        tag.setColor("blue");

        tagService.removeTag(tag);

        verify(tagRepository, times(1)).deleteById(tag.getId());
    }


    @Test
    public void testDeleteTagsFromNote() {
        Note note = new Note();
        note.setId("12345");

        tagService.deleteTagsFromNote(note.getId());

        verify(tagRepository, times(1)).deleteAllByNoteId(note.getId());
    }
}
