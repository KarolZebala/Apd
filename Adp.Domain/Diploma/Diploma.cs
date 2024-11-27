namespace Adp.Domain.Diploma;

public sealed class Diploma
{
    public static Diploma Create(
        string title
    )
    {
        return new Diploma(
            title: title
        );
    }
    
    public long DiplomaId { get; private set; }
    public string Title { get; private set; }
    public string? Type { get; private set; }
    public string? Description { get; private set; }
    public string? DepartmentName { get; private set; }
    public string? Course { get; private set; }
    public DateTime CreateDate { get; private set; }
    public string Status { get; private set; } //To do convert to enum
    public string StudentId { get; private set; }
    public string PromoterId { get; private set; }
    public string ReviewerId { get; private set; }
    
    private Diploma(string title)
    {
        Title = title;
        CreateDate = DateTime.UtcNow;
        Status = "New";
    }
}