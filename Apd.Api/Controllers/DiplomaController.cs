using Adp.Application.Dto;
using Adp.Application.RequestModel;
using Adp.Application.Services;
using Apd.Api.RequestModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Apd.Api.Controllers;

[ApiController]
[Route("[controller]")]
//[Authorize(AuthenticationSchemes = "Bearer")]
public class DiplomaController : ControllerBase
{
    private readonly IDiplomaService _diplomaService;

    public DiplomaController(IDiplomaService diplomaService)
    {
        _diplomaService = diplomaService;
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
    //[Authorize(Roles = "Professor")]
    public async Task<IActionResult> AddDiploma([FromBody] CreateDiplomaRequestModel requestModel)
    {
        try
        {
            var res = await _diplomaService.AddDiploma(requestModel);

            return Ok(res);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [HttpPost("UpdateDiploma")]
    //[Authorize(Roles = "Student")]
    public async Task<IActionResult> UpdateDiploma([FromBody] UpdateDiplomaDetailsRequestModel requestModel)
    {
        try
        {
            await _diplomaService.UpdateDiploma(requestModel);

            return Ok();
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [HttpPost("SearchDiploma")]
    public async Task<IActionResult> SearchDiploma([FromBody] DiplomaSearchRequestModel requestModel)
    {
        try
        {
            var response = await _diplomaService.SearchDiploma(requestModel);
            return Ok(response);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
}