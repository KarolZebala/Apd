using Adp.Application.Dto;
using Adp.Domain.Diploma;

namespace Adp.Application.Extensions;

public static class DiplomaReviewExtensions
{
    public static DiplomaReviewDto ToDto(this DiplomaReview diplomaReview)
    {
        var dto = new DiplomaReviewDto()
        {
            DiplomaReviewId = diplomaReview.DiplomaReviewId,
            DiplomaId = diplomaReview.DiplomaId,
            ReviewContent = diplomaReview.ReviewContent,
            ReviewerId = diplomaReview.ReviewerId
        };
        return dto;
    }

    public static DiplomaReviewDto[] ToDtos(this DiplomaReview[] reviews)
    {
        return reviews.Select(x => x.ToDto()).ToArray();
    }
}