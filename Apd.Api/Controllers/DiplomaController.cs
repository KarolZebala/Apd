using Adp.Application.Dto;
using Adp.Application.RequestModel;
using Adp.Application.Services;
using Apd.Api.Helpers;
using Apd.Api.RequestModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Apd.Api.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(AuthenticationSchemes = "Bearer")]
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

            if (diploma == null)
            {
                return NotFound();
            }

            return Ok(diploma);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [HttpPost("AddDiploma")]
    [Authorize(Roles = "Professor")]
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
    [Authorize(Roles = "Student")]
    public async Task<IActionResult> UpdateDiploma([FromBody] UpdateDiplomaDetailsRequestModel requestModel)
    {
        try
        {
            var currentUser = User.GetUserIdFromToken();
            await _diplomaService.UpdateDiploma(requestModel, currentUser);

            return Ok();
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [HttpGet("DownloadDiploma")]
    public async Task<IActionResult> DownloadDiploma(long diplomaId, long attachmentId)
    {
        try
        {
            var attachment = await _diplomaService.GetAttachmentFile(diplomaId, attachmentId);
            
            if (attachment is null)
            {
                return NotFound();
            }
            var contentType = string.IsNullOrWhiteSpace(attachment.ContentType) ? "application/octet-stream" : attachment.ContentType;
            return File(attachment.Data, contentType, attachment.Title);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [HttpPost("SearchDiploma")]
    [AllowAnonymous]
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