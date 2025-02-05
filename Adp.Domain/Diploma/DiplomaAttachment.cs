namespace Adp.Domain.Diploma;

public sealed class DiplomaAttachment
{
    public static DiplomaAttachment Create(
        string title,
        long size,
        string extension,
        string contentType,
        byte[] data
    )
    {
        return new DiplomaAttachment(
            title: title,
            size: size,
            extension: extension,
            contentType: contentType,
            data: data
        );
    }

    public long DiplomaAttachmentId { get; private set; }
    public long DiplomaId { get; private set; }
    public string Title { get; private set; }
    public long Size { get; private set; }
    public string Extension { get; private set; }
    public string ContentType { get; private set; }
    
    public DiplomaAttachmentData Data { get; private set; }
    
    private DiplomaAttachment()
    {
        
    }
    
    private DiplomaAttachment(
        string title,
        long size,
        string extension,
        string contentType,
        byte[] data
    )
    {
        Title = title;
        Size = size;
        Extension = extension;
        ContentType = contentType;
        Data = DiplomaAttachmentData.Create(data);
    }
}

public sealed class DiplomaAttachmentData
{
    public static DiplomaAttachmentData Create(byte[] data)
    {
        return new DiplomaAttachmentData(data);
    }

    public long DiplomaAttachmentId { get; private set; }
    public byte[] Data { get; private set; }

    private DiplomaAttachmentData()
    {
    }

    private DiplomaAttachmentData(byte[] data)
    {
        Data = data;
    }
}