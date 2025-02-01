namespace Adp.Application.Dto;

public class ExamDto
{
    public long ExamId { get; set; }
    public long DiplomaId { get; set; }
    public DateTime ExamDate { get; set; }
    public int? Score { get; set; }
}