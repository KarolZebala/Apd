namespace Adp.Application.RequestModel;

public class CreateDiplomaReviewRequestModel
{
    public long DiplomaId { get; set; }
    public string ReviewerId { get; set; }
    public string ReviewContent { get; set; }
}