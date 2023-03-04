package opennote.tag;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, String>{
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM tags WHERE note_id=?1", nativeQuery = true)
    void deleteAllByNoteId(String noteId);
}
