package opennote.folder;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderRepository extends JpaRepository<Folder, String> {
    @Query(value = "SELECT * FROM folders WHERE user_id = ?1", nativeQuery = true)
    List<Folder> getFoldersByUserId(Integer userId);
}
