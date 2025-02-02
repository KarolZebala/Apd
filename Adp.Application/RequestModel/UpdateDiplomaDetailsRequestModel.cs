namespace Adp.Application.RequestModel;

public class UpdateDiplomaDetailsRequestModel
{
    public long DiplomaId { get; set; }
    public string? Description { get; set; }
    
    public DiplomaAttachmentRequestModel[]? Attachments { get; set; }
    public DiplomaTagRequestModel[]? Tags { get; set; }
}