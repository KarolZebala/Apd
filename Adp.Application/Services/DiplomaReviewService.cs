using Adp.Application.Dto;
using Adp.Application.Extensions;
using Adp.Application.RequestModel;
using Adp.Domain;
using Adp.Domain.BuildingBlocks;
using Adp.Domain.Diploma;

namespace Adp.Application.Services;

public interface IDiplomaReviewService
{
    Task<long> AddReview(CreateDiplomaReviewRequestModel requestModel, string currentUserId);
    Task<DiplomaReviewDto?> GetReviewById(long reviewId);
    
    Task<DiplomaReviewDto[]> SearchReviews(DiplomaReviewSearchRequestModel requestModel);
}

public class DiplomaReviewService : IDiplomaReviewService
{
    private readonly IDiplomaRepository _diplomaRepository;
    private readonly IDiplomaReviewRepository _diplomaReviewRepository;
    private readonly IUserRepository _userRepository;
    private readonly IEmailSender _emailSender;

    public DiplomaReviewService(
        IDiplomaRepository diplomaRepository,
        IDiplomaReviewRepository diplomaReviewRepository,
        IUserRepository userRepository,
        IEmailSender emailSender
    )
    {
        _diplomaRepository = diplomaRepository;
        _diplomaReviewRepository = diplomaReviewRepository;
        _userRepository = userRepository;
        _emailSender = emailSender;
    }
    
    public DiplomaReviewService(IDiplomaReviewRepository diplomaReviewRepository)
    {
        _diplomaReviewRepository = diplomaReviewRepository;
    }

    public async Task<long> AddReview(CreateDiplomaReviewRequestModel requestModel, string currentUserId)
    {
        var diploma = await _diplomaRepository.GetByIdAsync(requestModel.DiplomaId);
        if (diploma == null)
        {
            throw new ArgumentException("Diploma not found");
        }

        if (diploma.ReviewerId != currentUserId)
        {
            throw new ArgumentException($"Curent user id not a reviewer of diploma: {diploma.DiplomaId}");
        }
        
        var review = Domain.Diploma.DiplomaReview.CreateNew(
            diploma.DiplomaId,
            requestModel.ReviewerId,
            requestModel.ReviewContent
        );

        if (string.IsNullOrWhiteSpace(review.ReviewContent))
        {
            throw new ArgumentException("Review content is empty");
        }
        
        await _diplomaReviewRepository.AddAsync(review);
        await _diplomaRepository.SaveChangesAsync();

        var student = await _userRepository.GetByIdAsync(diploma.StudentId);
        //_emailSender.SendEmailAsync(student.Email, "Diploma review added", "Twoja praca otrzymała recenzje w systemi");

        return review.DiplomaReviewId;
    }

    public async Task<DiplomaReviewDto?> GetReviewById(long reviewId)
    {
        var review = await _diplomaReviewRepository.GetByIdAsync(reviewId);

        if (review == null)
        {
            return null;
        }

        var dto = review.ToDto();
        return dto;
    }

    public async Task<DiplomaReviewDto[]> SearchReviews(DiplomaReviewSearchRequestModel requestModel)
    {
        var reviews = await _diplomaReviewRepository.GetReviewsAsync(requestModel.ReviewerId, requestModel.PageNumber, requestModel.PageSize);

        var dtos = reviews.ToDtos();
        return dtos;
    }
}