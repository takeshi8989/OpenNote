package opennote.like;

import lombok.RequiredArgsConstructor;
import opennote.note.Note;
import opennote.user.User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;

    public void toggleLike(Note note, User user){
        Like like = likeRepository.findLike(note.getId(), user.getId());
        System.out.println(like);
        if(like == null){
            addLike(note, user);
        } else {
            likeRepository.deleteById(like.getId());
        }
    }

    public void addLike(Note note, User user){
        Like like = new Like();
        like.setNote(note);
        like.setUser(user);
        likeRepository.save(like);
    }

}
