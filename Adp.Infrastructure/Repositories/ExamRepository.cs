using System.Data.Entity;
using Adp.Domain.Exam;

namespace Adp.Infrastructure.Repositories;

public class ExamRepository(ApdDbContext _context) : IExamRepository
{
    public async Task<Exam> AddAsync(Exam exam)
    {
        var res = await _context.Exams.AddAsync(exam);
        return res.Entity;
    }

    public async Task<Exam?> GetByIdAsync(long id)
    {
        var res =  _context.Exams.FirstOrDefault(x => x.ExamId == id);
        return await Task.FromResult(res);
    }

    public async Task<Exam[]> GetExamsAsync(int? pageNumber, int? pageSize)
    {
        IQueryable<Exam> query = _context.Exams
            .AsNoTracking()
            .AsQueryable();
        

        if (pageNumber.HasValue && pageSize.HasValue)
        {
            query = query.Skip((pageNumber.Value) * pageSize.Value).Take(pageSize.Value);
        }
        
        var res= query.ToArray();
        return await Task.FromResult(res);
    }
}