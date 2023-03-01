package opennote.note;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import opennote.comment.Comment;
import opennote.folder.Folder;
import opennote.like.Like;
import opennote.tag.Tag;
import opennote.user.User;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "notes")
@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class Note {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    @Column(columnDefinition = "CHAR(32)")
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer", "notes"})
    private User user;

    @OneToMany(mappedBy = "note")
    private List<Tag> tags = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "notes")
    @JsonBackReference
    private List<Folder> folders = new ArrayList<>();
    private String title;
    private String url;
    private String description;
    private boolean isPublic;
    @OneToMany(mappedBy = "note")
    private List<Like> likes;

    @OneToMany(mappedBy = "note")
    private List<Comment> comments;
    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;

    @Column(columnDefinition = "integer default 0")
    private Integer numDownload = 0;

    public void incrementDownloadCount(){
        this.numDownload++;
    }
}
