namespace Apd.Api.RequestModels;

public class RegisterRequestModel
{
    public required string Username { get; set; }
    public required string Password { get; set; }
    public required string Role { get; set; }
}