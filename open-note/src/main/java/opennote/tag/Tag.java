package opennote.tag;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import opennote.note.Note;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "tags")
@Data
public class Tag {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(columnDefinition = "CHAR(32)")
    private String id;
    private String name;
    private String color;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id")
    @JsonIgnore
    private Note note;
}
