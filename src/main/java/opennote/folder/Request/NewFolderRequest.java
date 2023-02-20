package opennote.folder.Request;

public record NewFolderRequest(
        Integer userId,
        String title
) {}
