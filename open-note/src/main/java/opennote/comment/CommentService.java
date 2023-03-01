package opennote.comment;

import lombok.RequiredArgsConstructor;
import opennote.note.Note;
import opennote.note.NoteService;
import opennote.user.User;
import opennote.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
    @Autowired
    private final CommentRepository commentRepository;
    @Autowired
    private final UserService userService;
    @Autowired
    private final NoteService noteService;
    public Comment createComment(NewCommentRequest request){
        User user = userService.getUserByUsername(request.username());
        Note note = noteService.getNoteById(request.noteId());
        Comment comment = new Comment();
        comment.setAuthor(user);
        comment.setNote(note);
        comment.setContent(request.content());
        return commentRepository.save(comment);
    }

    public Comment updateComment(String id, NewCommentRequest request){
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("comment not found"));
        comment.setContent(request.content());
        return commentRepository.save(comment);
    }

    public void deleteComment(String id){
        commentRepository.deleteById(id);
    }
}
