using Adp.Application.RequestModel;
using Adp.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace Apd.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class DiplomaReviewController : ControllerBase
{
    private readonly IDiplomaReviewService _diplomaReviewService;

    public DiplomaReviewController(IDiplomaReviewService diplomaReviewService)
    {
        _diplomaReviewService = diplomaReviewService;
    }


    [HttpPost("AddReview")]
    public async Task<IActionResult> AddReview([FromBody] CreateDiplomaReviewRequestModel requestModel)
    {
        try
        {
            var res = await _diplomaReviewService.AddReview(requestModel);

            return Ok(res);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
    
    [HttpGet("GetReview")]
    public async Task<ActionResult> GetDiploma(long reviewId)
    {
        try
        {
            var review = await _diplomaReviewService.GetReviewById(reviewId);
            
            if (review == null)
            {
                return NotFound();
            }
            
            return Ok(review);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
    
    [HttpPost("SearchReview")]
    public async Task<IActionResult> SearchDiploma([FromBody] DiplomaReviewSearchRequestModel requestModel)
    {
        try
        {
            var response = await _diplomaReviewService.SearchReviews(requestModel);
            return Ok(response);
        }
        catch (Exception e)
        {
            return Problem(e.Message);
        }
    }
}