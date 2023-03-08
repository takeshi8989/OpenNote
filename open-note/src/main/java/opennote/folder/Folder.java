package opennote.folder;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Table;
import lombok.Data;
import opennote.note.Note;
import opennote.user.User;
import org.hibernate.annotations.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table( name = "folders" )
@Data
public class Folder {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(columnDefinition = "CHAR(32)")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.DETACH, CascadeType.MERGE,
            CascadeType.REFRESH, CascadeType.PERSIST
    }, targetEntity = Note.class)
    @JoinTable(name = "folder_notes",
            joinColumns = @JoinColumn(name = "folder_id",
                    nullable = false,
                    updatable = false),
            inverseJoinColumns = @JoinColumn(name = "note_id",
                    nullable = false,
                    updatable = false),
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT))
    @JsonManagedReference
    private List<Note> notes = new ArrayList<>();
    private String title;
    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;

    public Folder(){}

    public Folder(String id, User user, String title, Date createdAt, Date updatedAt) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public void addNote(Note note){
        notes.add(note);
    }

    public void removeNote(Note note){
        notes.remove(note);
    }
}
