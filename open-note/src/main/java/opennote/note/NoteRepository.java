package opennote.note;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, String> {
    @Query(value = "SELECT * from notes WHERE is_public=true ORDER BY updated_at DESC", nativeQuery = true)
    List<Note> getRecentNotes();
    // TO-DO limit 12

    @Query(value = "SELECT * from notes ORDER BY num_views DESC LIMIT 12", nativeQuery = true)
    List<Note> getMostViewedNotes();

    @Query(value = "SELECT notes.* from notes, users WHERE notes.user_id=users.id AND users.username=?1", nativeQuery = true)
    List<Note> getNotesByUsername(String username);

    @Query(value = "SELECT notes.* from notes, folders, folder_notes " +
            "WHERE folder_notes.folder_id = folders.id " +
            "AND folder_notes.note_id = notes.id " +
            "AND folders.id = ?1",
            nativeQuery = true)
    List<Note> getNotesByFolderId(String folderId);

    @Query(value = "SELECT * FROM notes " +
            "WHERE LOWER(title) like CONCAT('%', ?1, '%') AND " +
            "LOWER(title) like CONCAT('%', ?2, '%') AND " +
            "LOWER(title) like CONCAT('%', ?3, '%') AND " +
            "LOWER(title) like CONCAT('%', ?4, '%') AND " +
            "LOWER(title) like CONCAT('%', ?5, '%') AND " +
            "is_public", nativeQuery = true)
    List<Note> getNotesBySearch(String word1, String word2, String word3, String word4, String word5);
    // TO-DO LIMIT 12
}
