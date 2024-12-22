namespace Adp.Application.RequestModel;

public class DiplomaSearchRequestModel
{
    public string? SearchString { get; set; }
    public string[]? StudentIds { get; set; }
    public string[]? PromoterIds { get; set; }
    public string[]? ReviewerIds { get; set; }
    public string? Status { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}