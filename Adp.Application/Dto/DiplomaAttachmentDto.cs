using Esprima.Ast;

namespace Adp.Application.Dto;

public class DiplomaAttachmentDto
{
    public long DiplomaAttachmentId { get; set; }
    public long DiplomaId { get; set; }
    public string Title { get; set; }
    public long Size { get; set; }
    public string Extension { get; set; }
    public byte[] Data { get; set; }
}