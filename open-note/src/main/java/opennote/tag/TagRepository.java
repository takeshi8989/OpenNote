package opennote.tag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, String>{
    @Query(value = "DELETE FROM tags WHERE note_id=?1", nativeQuery = true)
    void deleteAllByNoteId(String noteId);
}
