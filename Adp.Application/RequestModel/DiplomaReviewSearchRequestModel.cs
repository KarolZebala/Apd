namespace Adp.Application.RequestModel;

public class DiplomaReviewSearchRequestModel
{
    public string? ReviewerId { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}