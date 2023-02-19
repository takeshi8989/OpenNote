package opennote.Note;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, String> {
    @Query(value = "SELECT * from notes WHERE user_id=?1", nativeQuery = true)
    List<Note> getNotesByUserId(Integer id);
}
