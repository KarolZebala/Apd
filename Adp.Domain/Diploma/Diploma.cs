namespace Adp.Domain.Diploma;

public sealed class Diploma
{
    public static Diploma Create(
        string title,
        string? type,
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

    public IReadOnlyCollection<DiplomaAttachment> Attachments
    {
        get => _attachments;
        private set => _attachments = new HashSet<DiplomaAttachment>(value);
    }

    private HashSet<DiplomaAttachment> _attachments;

    public IReadOnlyCollection<DiplomaTag> Tags
    {
        get => _tags;
        private set => _tags = new HashSet<DiplomaTag>(value);
    }

    private HashSet<DiplomaTag> _tags;

    private Diploma()
    {
        _attachments = new HashSet<DiplomaAttachment>();
        _tags = new HashSet<DiplomaTag>();
    }

    private Diploma(
        string title,
        string? type,
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
        DepartmentName = departmentName;
        Course = course;
    }

    public void UpdateDescription(string? description)
    {
        Description = description;
    }

    public void AddAttachent(
        string attachmentTitle,
        string attachmentExtension,
        long attachmentSize,
        byte[] attachmentData
    )
    {
        var attachment = DiplomaAttachment.Create(
            title: attachmentTitle,
            extension: attachmentExtension,
            size: attachmentSize,
            data: attachmentData
        );
        _attachments.Add(attachment);
    }

    public void AddTag(
        string tagName
    )
    {
        var tag = DiplomaTag.Create(
            name: tagName
        );
        _tags.Add(tag);
    }
}