using System.Security.Claims;

namespace Apd.Api.Helpers;

public static class UserHelper
{
    public static string GetUserIdFromToken(this ClaimsPrincipal user)
    {
        return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
}