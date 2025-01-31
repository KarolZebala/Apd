using System.Data.Entity;
using Adp.Domain.Diploma;

namespace Adp.Infrastructure.Repositories;

public class DiplomaReviewRepository(ApdDbContext _context) : IDiplomaReviewRepository
{
    public async Task<DiplomaReview> AddAsync(DiplomaReview diplomaReview)
    {
        var res = await _context.Reviews.AddAsync(diplomaReview);
        return res.Entity;
    }

    public async Task<DiplomaReview?> GetByIdAsync(long id)
    {
        var res =  _context.Reviews.FirstOrDefault(x => x.DiplomaReviewId == id);
        return await Task.FromResult(res);
    }

    public async Task<DiplomaReview[]> GetReviewsAsync(string reviewerId, int pageNumber, int pageSize)
    {
        IQueryable<DiplomaReview> query = _context.Reviews
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(reviewerId))
        {
            query = query.Where(d => d.ReviewerId == reviewerId);
        }

        if (pageNumber > 0 && pageSize > 0)
        {
            query = query.Skip((pageNumber - 1) * pageSize).Take(pageSize);
        }
        
        var res= query.ToArray();
        return await Task.FromResult(res);
    }
}