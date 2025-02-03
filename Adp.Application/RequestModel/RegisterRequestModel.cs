using System.ComponentModel.DataAnnotations;

namespace Apd.Api.RequestModels;

public class RegisterRequestModel
{
    public required string Username { get; set; }
    [EmailAddress]
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string Role { get; set; }
}