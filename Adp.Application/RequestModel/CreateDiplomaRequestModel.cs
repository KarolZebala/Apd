using Microsoft.AspNetCore.Http;

namespace Adp.Application.RequestModel;

public class CreateDiplomaRequestModel
{
    public required string Title { get; set; }
    public string? Type { get; set; }
    public string? DepartmentName { get; set; }
    public string? Course { get; set; }
    public DateTime CreateDate { get; set; }
    public required string StudentId { get; set; }
    public required string PromoterId { get; set; }
    public required string ReviewerId { get; set; }
}

public class UpdateDiplomaDetailsRequestModel
{
    public long DiplomaId { get; set; }
    public string? Description { get; set; }
    
    public DiplomaAttachmentRequestModel[]? Attachments { get; set; }
}

public class DiplomaAttachmentRequestModel
{
    public string Title { get; set; }
    public long Size { get; set; }
    public string Extension { get; set; }
    public byte[] Data { get; set; }
}