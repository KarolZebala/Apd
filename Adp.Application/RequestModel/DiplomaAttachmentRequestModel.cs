namespace Adp.Application.RequestModel;

public class DiplomaAttachmentRequestModel
{
    public string Title { get; set; }
    public long Size { get; set; }
    public string Extension { get; set; }
    public byte[] Data { get; set; }
}