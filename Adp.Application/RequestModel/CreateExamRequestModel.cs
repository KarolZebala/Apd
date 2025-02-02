namespace Adp.Application.RequestModel;

public class CreateExamRequestModel
{
    public long DiplomaId { get; set; }
    public DateTime ExamDate { get; set; }
    public int? Score { get; set; }
}