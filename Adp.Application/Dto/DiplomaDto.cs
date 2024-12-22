namespace Adp.Application.Dto;

public class DiplomaDto
{
    public long DiplomaId { get; set; }
    public required string Title { get; set; }
    public string? Type { get; set; }
    public string? Description { get; set; }
    public string? DepartmentName { get; set; }
    public string? Course { get; set; }
    public DateTime CreateDate { get; set; }
    public required string Status { get; set; } //To do convert to enum
    public required string StudentId { get; set; }
    public required string PromoterId { get; set; }
    public required string ReviewerId { get; set; }
}