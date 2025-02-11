using Adp.Application.RequestModel;
using Adp.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Apd.Api.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(AuthenticationSchemes = "Bearer")]
public class ExamController : ControllerBase
{
    private readonly IExamService _examService;

    public ExamController(IExamService examService)
    {
        _examService = examService;
    }

    [HttpPost]
    [Route("AddExam")]
    [Authorize(Roles = "Professor")]
    public async Task<IActionResult> AddExam(CreateExamRequestModel requestModel)
    {
        try
        {
            var result = await _examService.CreateExam(requestModel);
            return Ok(result);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [HttpPost]
    [Route("UpdateExam")]
    [Authorize(Roles = "Professor")]
    public async Task<IActionResult> UpdateExam(UpdateExamRequestModel requestModel)
    {
        try
        {
            await _examService.UpdateExam(requestModel);
            return Ok();
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }

    [HttpGet]
    [Route("GetById")]
    public async Task<IActionResult> GetById(long examId)
    {
        try
        {
            var exam = await _examService.GetByIdAsync(examId);

            if (exam is null)
            {
                return NotFound();
            }
            
            return Ok(exam);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
    
    [HttpPost]
    [Route("SearchExams")]
    public async Task<IActionResult> SearchExams(SearchExamRequestModel requestModel)
    {
        try
        {
            var exams = await _examService.SearchExams(requestModel);
            
            return Ok(exams);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
}