package opennote.tag;

import lombok.RequiredArgsConstructor;
import opennote.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagService {
    @Autowired
    private final TagRepository tagRepository;
    public Tag createTag(NewTagRequest request){
        Tag tag = new Tag();
        tag.setName(request.name());
        tag.setColor(request.color());
        tag.setNote(request.note());
        return tagRepository.save(tag);
    }

}
