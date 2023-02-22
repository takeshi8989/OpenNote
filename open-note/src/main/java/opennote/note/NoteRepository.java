package opennote.note;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, String> {
    @Query(value = "SELECT * from notes ORDER BY updated_at DESC LIMIT 10", nativeQuery = true)
    List<Note> getRecentNotes();

    @Query(value = "SELECT * from notes WHERE user_id=?1", nativeQuery = true)
    List<Note> getNotesByUserId(Integer userId);

    @Query(value = "SELECT notes.* from notes, folders, folder_notes " +
            "WHERE folder_notes.folder_id = folders.id " +
            "AND folder_notes.note_id = notes.id " +
            "AND folders.id = ?1",
            nativeQuery = true)
    List<Note> getNotesByFolderId(String folderId);

    @Query(value = "SELECT * FROM notes WHERE title LIKE CONCAT('%', ?1, '%')", nativeQuery = true)
    List<Note> getNotesBySearch(String query);
}