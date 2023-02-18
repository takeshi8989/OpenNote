package opennote.Note;

public class NoteNotFoundException extends RuntimeException{
    public NoteNotFoundException(String id) { super("Could not find note " + id);}
}
