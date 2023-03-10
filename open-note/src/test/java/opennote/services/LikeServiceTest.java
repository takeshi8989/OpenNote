package opennote.services;

import opennote.like.Like;
import opennote.like.LikeRepository;
import opennote.like.LikeService;
import opennote.note.Note;
import opennote.user.User;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
class LikeServiceTest {
    @Mock
    private LikeRepository likeRepository;

    @InjectMocks
    private LikeService likeService;

    @Test
    void shouldToggleLike() {
        Note note = new Note();
        User user = new User();
        when(likeRepository.findLike(note.getId(), user.getId())).thenReturn(null);

        likeService.toggleLike(note, user);

        verify(likeRepository, times(1)).findLike(note.getId(), user.getId());
        verify(likeRepository, times(1)).save(any(Like.class));
    }

    @Test
    void shouldAddLike() {
        Note note = new Note();
        User user = new User();

        likeService.addLike(note, user);

        verify(likeRepository, times(1)).save(any(Like.class));
    }
}

