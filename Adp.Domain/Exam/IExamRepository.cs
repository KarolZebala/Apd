namespace Adp.Domain.Exam;

public interface IExamRepository
{
    Task<Exam> AddAsync(Exam exam);
    Task<Exam?> GetByIdAsync(long id);
    Task<Exam[]> GetExamsAsync(
        long? diplomaId,
        int? pageNumber,
        int? pageSize
    );
}