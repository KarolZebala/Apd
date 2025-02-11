using Adp.Application.RequestModel;
using Adp.Application.Services;
using Apd.Api.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Apd.Api.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(AuthenticationSchemes = "Bearer")]
public class DiplomaReviewController : ControllerBase
{
    private readonly IDiplomaReviewService _diplomaReviewService;

    public DiplomaReviewController(IDiplomaReviewService diplomaReviewService)
    {
        _diplomaReviewService = diplomaReviewService;
    }


    [HttpPost("AddReview")]
    [Authorize(Roles = "Professor")]
    public async Task<IActionResult> AddReview([FromBody] CreateDiplomaReviewRequestModel requestModel)
    {
        try
        {
            var currentUserId = User.GetUserIdFromToken();
            var res = await _diplomaReviewService.AddReview(requestModel, currentUserId);

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