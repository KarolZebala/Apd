namespace Adp.Domain.Diploma;

public interface IDiplomaReviewRepository
{
    Task<DiplomaReview> AddAsync(DiplomaReview diplomaReview);
    Task<DiplomaReview?> GetByIdAsync(long id);
    Task<DiplomaReview[]> GetReviewsAsync(
        string reviewerId,
        int pageNumber,
        int pageSize
    );
}