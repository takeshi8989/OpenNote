package opennote.comment;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("comments")
@RequiredArgsConstructor
public class CommentController {
    @Autowired
    private final CommentService commentService;

    @PostMapping
    public Comment createComment(@RequestBody NewCommentRequest request){
        return commentService.createComment(request);
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable String id, @RequestBody NewCommentRequest request){
        return commentService.updateComment(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable String id){
        commentService.deleteComment(id);
    }
}
