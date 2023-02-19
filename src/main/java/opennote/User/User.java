package opennote.User;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import opennote.Folder.Folder;
import opennote.Note.Note;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name =  "users")
public class User {
    @Id
    @SequenceGenerator(
            name = "user_id_sequence",
            sequenceName = "user_id_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_id_sequence"
    )
    private Integer id;
    private String username;
    private String email;
    @JsonIgnore
    private String password;
    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Folder> folders = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Note> notes = new ArrayList<>();
    public User(){}


    public User(Integer id, String username, String email, String password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Integer getId(){
        return id;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Folder> getFolders() {
        return folders;
    }

    public void setFolders(List<Folder> folders) {
        this.folders = folders;
    }

    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }
}
