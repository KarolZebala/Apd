using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Apd.Api.RequestModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using IdentityUser = Microsoft.AspNet.Identity.EntityFramework.IdentityUser;

namespace Apd.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly Microsoft.AspNet.Identity.UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;

    public UserController(Microsoft.AspNet.Identity.UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequestModel request)
    {
        var user = new IdentityUser { UserName = request.Username, Email = request.Email };
        var result = await _userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        await _userManager.AddToRoleAsync(user.Id, request.Role);

        return Ok(new { message = "User registered successfully" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestModel request)
    {
        var user = await _userManager.FindByNameAsync(request.Username);
        var isValid = await _userManager.CheckPasswordAsync(user, request.Password);
        if (user == null || !isValid)
        {
            return Unauthorized();
        }

        var roles = await _userManager.GetRolesAsync(user.Id);
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.Role, roles.FirstOrDefault() ?? "User")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSuperSecretKey"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "JwtAuthExample",
            audience: "JwtAuthExample",
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds);

        return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
    }
}