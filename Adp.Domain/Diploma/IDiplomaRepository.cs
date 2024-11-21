namespace Adp.Domain.Diploma;

public interface IDiplomaRepository
{
    Task<Diploma?> AddAsync(Diploma diploma);

    Task<Diploma?> GetByIdAsync(long id);
    Task<int> SaveChangesAsync();
}