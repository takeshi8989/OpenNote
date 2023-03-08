package opennote.note;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import opennote.comment.Comment;
import opennote.folder.Folder;
import opennote.like.Like;
import opennote.tag.Tag;
import opennote.user.User;
import org.hibernate.annotations.*;

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

    @OneToMany(mappedBy = "note", orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Tag> tags = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.DETACH, CascadeType.MERGE,
                    CascadeType.REFRESH, CascadeType.PERSIST
            }, targetEntity = Folder.class)
    @JoinTable(name = "folder_notes",
            inverseJoinColumns = @JoinColumn(name = "folder_id",
                    nullable = false,
                    updatable = false),
            joinColumns = @JoinColumn(name = "note_id",
                    nullable = false,
                    updatable = false),
            foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT),
            inverseForeignKey = @ForeignKey(ConstraintMode.CONSTRAINT))
    @JsonBackReference
    private List<Folder> folders = new ArrayList<>();
    private String title;
    private String url;
    private String description;
    private boolean isPublic;
    @OneToMany(mappedBy = "note", orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Like> likes;

    @OneToMany(mappedBy = "note", orphanRemoval = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Comment> comments;
    @CreationTimestamp
    private Date createdAt;
    @UpdateTimestamp
    private Date updatedAt;

    @Column(columnDefinition = "integer default 0")
    private Integer numDownload = 0;

    @Column(columnDefinition = "integer default 0")
    private Integer numViews = 0;

    public void incrementDownloadCount(){
        this.numDownload++;
    }
    public void incrementViewsCount(){this.numViews++;}
}
