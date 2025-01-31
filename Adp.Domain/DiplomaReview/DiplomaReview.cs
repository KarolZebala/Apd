namespace Adp.Domain.Diploma;

public sealed class DiplomaReview
{
    public static DiplomaReview CreateNew(
        long diplomaId, 
        string reviewerId,
        string reviewContent
    )
    {
        return new DiplomaReview(diplomaId, reviewerId, reviewContent);
    }

    public long DiplomaReviewId { get; private set; }
    public long DiplomaId { get; private set; }
    public string ReviewerId { get; private set; }
    public string ReviewContent { get; private set; }
    
    private DiplomaReview() { }
    
    private DiplomaReview(long diplomaId, string reviewerId, string reviewContent)
    {
        DiplomaId = diplomaId;
        ReviewerId = reviewerId;
        ReviewContent = reviewContent;
    }
}