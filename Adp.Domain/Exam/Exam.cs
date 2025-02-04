namespace Adp.Domain.Exam;

public sealed class Exam
{
    public static Exam CreateNew(long diplomaId, DateTime examDate, int? score)
    {
        return new Exam(diplomaId, examDate, score);
    }
    
    public long ExamId { get; private set; }
    public long DiplomaId { get; private set; }
    public DateTime ExamDate { get; private set; }
    public int? Score { get; private set; }

    private Exam()
    {
        
    }
    
    private Exam(long diplomaId, DateTime examDate, int? score)
    {
        DiplomaId = diplomaId;
        ExamDate = new DateTime(examDate.Year, examDate.Month, examDate.Day, examDate.Hour, examDate.Minute, examDate.Second, DateTimeKind.Utc);
        Score = score;
    }

    public void Update(DateTime examDate, int? score)
    {
        ExamDate = new DateTime(examDate.Year, examDate.Month, examDate.Day, examDate.Hour, examDate.Minute, examDate.Second, DateTimeKind.Utc);;
        Score = score;
    }
}