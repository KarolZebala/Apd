namespace Adp.Application.RequestModel;

public class SearchExamRequestModel
{
    public long? DiplomaId { get; set; }
    public int? PageNumber { get; set; }
    public int? PageSize { get; set; }
}