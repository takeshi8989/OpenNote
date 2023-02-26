package opennote.tag;

import opennote.note.Note;

public record NewTagRequest(
        String name,
        String color
) {
}
