namespace Adp.Domain.Exam;

public interface IExamRepository
{
    Task<Exam> AddAsync(Exam exam);
    Task<Exam?> GetByIdAsync(long id);
    Task<Exam[]> GetExamsAsync(
        int? pageNumber,
        int? pageSize
    );
}