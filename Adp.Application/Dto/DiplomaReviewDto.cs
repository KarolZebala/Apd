namespace Adp.Application.Dto;

public class DiplomaReviewDto
{
    public long DiplomaReviewId { get; set; }
    public long DiplomaId { get; set; }
    public string ReviewerId { get; set; }
    public string ReviewContent { get; set; }
}