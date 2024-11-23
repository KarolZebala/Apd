using Adp.Application.Dto;
using Adp.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Apd.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class DiplomaController : ControllerBase
{
    private readonly IDiplomaService _diplomaService;

    public DiplomaController(IDiplomaService diplomaService)
    {
        _diplomaService = diplomaService;
    }

    [HttpGet("ping")]
    public ActionResult Ping()
    {
        return Ok("pong");
    }
    
    [HttpPost("pingost")]
    public ActionResult PingPost()
    {
        return Ok("pongpost");
    }

    [HttpGet("GetDiploma")]
    public async Task<ActionResult> GetDiploma(long diplomaId)
    {
        try
        {
            var diploma = await _diplomaService.GetDiplomaById(diplomaId);
            return Ok(diploma);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
    
    [HttpPost("AddDiploma")]
    public async Task<IActionResult> AddDiploma([FromBody] DiplomaDto dto)
    {
        try
        {
            var res = await _diplomaService.AddDiploma(dto);

            return Ok(res);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
}