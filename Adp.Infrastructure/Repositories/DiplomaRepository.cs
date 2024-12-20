using Adp.Domain.Diploma;
using Microsoft.EntityFrameworkCore;


namespace Adp.Infrastructure.Repositories;

public class DiplomaRepository(ApdDbContext context) : IDiplomaRepository
{
    public async Task<Diploma?> AddAsync(Diploma diploma)
    {
        var res = await context.Diplomas.AddAsync(diploma);
        return res.Entity;
    }

    public async Task<Diploma?> GetByIdAsync(long id)
    {
        return await context.Diplomas.FirstOrDefaultAsync(x => x.DiplomaId == id);
    }

    public async Task<int> SaveChangesAsync()
    {
        var res = await context.SaveChangesAsync();
        return res;
    }
}