using Microsoft.AspNetCore.Identity;

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
    public IdentityUser Student { get; private set; }
    public string PromoterId { get; private set; }
    public IdentityUser Promoter { get; private set; }
    public string ReviewerId { get; private set; }
    public IdentityUser Reviewer { get; private set; }
    
    public IReadOnlyCollection<DiplomaAttachment> Attachments
    {
        get => _attachments;
        private set => _attachments = new HashSet<DiplomaAttachment>(value);
    }

    private HashSet<DiplomaAttachment> _attachments;
    
    public IReadOnlyCollection<Exam.Exam> Exams
    {
        get => _exams;
        private set => _exams = new HashSet<Exam.Exam>(value);
    }

    private HashSet<Exam.Exam> _exams;
    
    public IReadOnlyCollection<DiplomaReview> Reviews
    {
        get => _reviews;
        private set => _reviews = new HashSet<DiplomaReview>(value);
    }

    private HashSet<DiplomaReview> _reviews;

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
        _reviews = new HashSet<DiplomaReview>();

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
        string contentType,
        byte[] attachmentData
    )
    {
        var attachment = DiplomaAttachment.Create(
            title: attachmentTitle,
            extension: attachmentExtension,
            size: attachmentSize,
            contentType: contentType,
            data: attachmentData
        );
        _attachments.Add(attachment);

        Status = "Ready to review";
    }


    public void AddTag(
        long diplomaId,
        string tagName
    )
    {
        var tag = DiplomaTag.Create(
            diplomaId: diplomaId,
            name: tagName
        );
        _tags.Add(tag);
    }

    public void AddReview(
        DiplomaReview review
    )
    {
        _reviews.Add(review);

        Status = "Reviewed";
    }

    public void Complete()
    {
        Status = "Completed";
    }
}