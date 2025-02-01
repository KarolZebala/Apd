namespace Adp.Application.RequestModel;

public class UpdateExamRequestModel
{
    public long ExamId { get; set; }
    public DateTime ExamDate { get; set; }
    public int? Score { get; set; }
}