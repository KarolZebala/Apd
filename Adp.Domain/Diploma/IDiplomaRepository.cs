namespace Adp.Domain.Diploma;

public interface IDiplomaRepository
{
    Task<Diploma?> AddAsync(Diploma diploma);

    Task<Diploma?> GetByIdAsync(long id);
    Task<int> SaveChangesAsync();

    Task<Diploma[]> SearchDiplomaAsync(
        string? searchString,
        string[]? studentIds,
        string[]? promoterIds,
        string[]? reviewerIds,
        string? status,
        int pageNumber,
        int pageSize,
        string? tag
    );
    
    Task<Diploma?> GetByIdWithAttachmentsAsync(long diplomaId);
}