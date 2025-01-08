using Microsoft.AspNetCore.Identity;

namespace Adp.Domain;

public interface IUserRepository
{
    Task<IdentityUser?> GetByIdAsync(string userId);
}