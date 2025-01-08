using Adp.Domain;
using Microsoft.AspNetCore.Identity;

namespace Adp.Infrastructure.Repositories.User;

public class UserRepository : IUserRepository
{
    private readonly UserManager<IdentityUser> _userManager;

    public UserRepository(UserManager<IdentityUser> userManager)
    {
        _userManager = userManager;
    }


    public async Task<IdentityUser?> GetByIdAsync(string userId)
    {
        return await _userManager.FindByIdAsync(userId);
    }
}