package opennote.like;

import opennote.note.Note;
import opennote.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, String> {
    @Query(value = "SELECT * FROM likes WHERE note_id=?1 AND user_id=?2", nativeQuery = true)
    public Like findLike(String noteId, Integer userId);
}
