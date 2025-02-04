using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Adp.Domain.BuildingBlocks;
using Apd.Api.Options;
using Apd.Api.RequestModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Apd.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IEmailSender _emailSender;
    private readonly SecretOptions _secretOptions;

    public UserController(
        UserManager<IdentityUser> userManager,
        IOptions<SecretOptions> secretOptions,
        IEmailSender emailSender
    )
    {
        _userManager = userManager;
        _emailSender = emailSender;
        _secretOptions = secretOptions.Value;
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestModel request)
    {
        var user = new IdentityUser
        {
            UserName = request.Username,
            Email = request.Email,
        };

        // Tworzenie użytkownika
        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            // Przetwórz listę błędów
            var errors = result.Errors.Select(e => e.Description).ToList();

            // Zwróć listę błędów w odpowiedzi
            return BadRequest(new
            {
                message = "Rejestracja nie powiodła się",
                errors = errors
            });
        }

        // Przypisz rolę użytkownikowi
        await _userManager.AddToRoleAsync(user, request.Role);

        // Zwróć sukces
        return Ok(new { message = $"Rejestracja zakończona sukcesem" });
    }


    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestModel request)
    {
        var user = await _userManager.FindByNameAsync(request.Username);
        var isValid = await _userManager.CheckPasswordAsync(user, request.Password);
        if (user is null || !isValid)
        {
            return Unauthorized();
        }

        var roles = await _userManager.GetRolesAsync(user);
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, roles.FirstOrDefault() ?? "User")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretOptions.MySecret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "Apd.Api",
            audience: "Apd.Api",
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds);

        return Ok(new JwtSecurityTokenHandler().WriteToken(token));
    }


    [HttpGet("GetUserById")]
    public async Task<IActionResult> GetUserById(string id)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            
            return Ok(new
            {
                user.UserName,
                user.Email,
                user.Id
            });
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
    
    [HttpGet("Search")]
    public async Task<IActionResult> Search(string searchString, string role)
    {
        var usersInRole = await _userManager.GetUsersInRoleAsync(role);

        var filteredUsers = usersInRole
            .Where(u => u.UserName.Contains(searchString))
            .Take(10)
            .Select(x => new
            {
                Id = x.Id,
                UserName = x.UserName,
                Email = x.Email,
            }).ToArray();

        return Ok(filteredUsers);
    }

    [HttpPost("SendEmail")]
    public async Task<IActionResult> SendEmail(string toEmail, string subject, string body)
    {
        try
        {
            await _emailSender.SendEmailAsync(toEmail, subject, body);
            return Ok();
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

}