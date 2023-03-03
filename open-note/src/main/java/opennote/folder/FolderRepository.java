package opennote.folder;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderRepository extends JpaRepository<Folder, String> {
    @Query(value = "SELECT folders.* from folders, users WHERE folders.user_id=users.id AND users.username=?1", nativeQuery = true)
    List<Folder> getFoldersByUsername(String username);
}
