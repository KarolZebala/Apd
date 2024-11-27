namespace Adp.Domain.Diploma;

public sealed class Diploma
{
    public static Diploma Create(
        string title,
        string? type,
        string? description,
        string? departmentName,
        string? course,
        string studentId,
        string promoterId,
        string reviewerId
    )
    {
        return new Diploma(
            title: title,
            type: type,
            description: description,
            departmentName: departmentName,
            course: course,
            studentId: studentId,
            promoterId: promoterId,
            reviewerId: reviewerId
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
    
    private Diploma(
        string title,
        string? type,
        string? description,
        string? departmentName,
        string? course,
        string studentId,
        string promoterId,
        string reviewerId
    )
    {
        Title = title;
        CreateDate = DateTime.UtcNow;
        Status = "New";
        
        StudentId = studentId;
        PromoterId = promoterId;
        ReviewerId = reviewerId;
        
        Type = type;
        Description = description;
        DepartmentName = departmentName;
        Course = course;
    }
}