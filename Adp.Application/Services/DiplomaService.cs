using Adp.Application.Dto;
using Adp.Application.Extensions;
using Adp.Application.RequestModel;
using Adp.Domain;
using Adp.Domain.BuildingBlocks;
using Adp.Domain.Diploma;
using Apd.Api.Workflows;
using Elsa.Models;
using Elsa.Services;
using Elsa.Services.Models;

namespace Adp.Application.Services;

public interface IDiplomaService
{
    Task<long> AddDiploma(CreateDiplomaRequestModel requestModel);
    Task<DiplomaDto?> GetDiplomaById(long diplomaId);
    Task UpdateDiploma(UpdateDiplomaDetailsRequestModel requestModel, string currentUserId);
    Task<DiplomaDto[]> SearchDiploma(DiplomaSearchRequestModel requestModel);
    Task<DiplomaAttachmentFileDto?> GetAttachmentFile(long diplomaId, long attachmentId);
}

public class DiplomaService : IDiplomaService
{
    private readonly IDiplomaRepository _diplomaRepository;
    private readonly IBuildsAndStartsWorkflow _buildsAndStartsWorkflow;
    private readonly IUserRepository _userRepository;
    private readonly IEmailSender _emailSender;

    public DiplomaService(
        IDiplomaRepository diplomaRepository,
        IBuildsAndStartsWorkflow buildsAndStartsWorkflow,
        IUserRepository userRepository,
        IEmailSender emailSender
    )
    {
        _diplomaRepository = diplomaRepository;
        _buildsAndStartsWorkflow = buildsAndStartsWorkflow;
        _userRepository = userRepository;
        _emailSender = emailSender;
    }

    public async Task<long> AddDiploma(CreateDiplomaRequestModel requestModel)
    {
        var diploma = Domain.Diploma.Diploma.Create(
            title: requestModel.Title,
            type: requestModel.Type,
            departmentName: requestModel.DepartmentName,
            course: requestModel.Course,
            studentId: requestModel.StudentId,
            promoterId: requestModel.PromoterId,
            reviewerId: requestModel.ReviewerId
        );
        
        await _diplomaRepository.AddAsync(diploma);

        await _diplomaRepository.SaveChangesAsync();
        
        var student = await _userRepository.GetByIdAsync(diploma.StudentId);
        
        if (student is null)
        {
            throw new ArgumentException($"Not found student with id: {diploma.StudentId}");
        }
        
        var promoter = await _userRepository.GetByIdAsync(diploma.PromoterId);
        
        if (promoter is null)
        {
            throw new ArgumentException($"Not found promoter with id: {diploma.PromoterId}");
        }
        
        var reviewer = await _userRepository.GetByIdAsync(diploma.ReviewerId);
        
        if (reviewer is null)
        {
            throw new ArgumentException($"Not found reviewer with id: {diploma.ReviewerId}");
        }

        var emailMessage =
            $"Dodano prace dyplomową {diploma.DiplomaId}. Zaloguj się do systemu APD w celu jej uzupełnienia";
        await _emailSender.SendEmailAsync(student.Email, "Dodano Twoją prace dyplomową do systemu.", emailMessage);
        
        return diploma.DiplomaId;
    }

    public async Task<DiplomaDto?> GetDiplomaById(long diplomaId)
    {
        var diploma = await _diplomaRepository.GetByIdAsync(diplomaId);
        if (diploma is null)
        {
            return null;
        }
        var diplomaDto = diploma.ToDto();
        
        return diplomaDto;
    }

    /// <summary>
    /// Add extra information to diploma, add attachments to diploma
    /// </summary>
    public async Task UpdateDiploma(UpdateDiplomaDetailsRequestModel requestModel, string currentUserId)
    {
        var diploma = await _diplomaRepository.GetByIdAsync(requestModel.DiplomaId);

        if (diploma == null)
        {
            throw new ArgumentException("Not found diploma");
        }

        if (diploma.StudentId != currentUserId)
        {
            throw new ArgumentException($"Current student is not assigned to diploma: {diploma.DiplomaId}");
        }
        
        diploma.UpdateDescription(requestModel.Description);

        if (requestModel.Attachments != null)
        {
            foreach (var attachment in requestModel.Attachments)
            {
                diploma.AddAttachent(
                    attachment.Title,
                    attachment.Extension,
                    attachment.Size,
                    attachment.ContentType,
                    attachment.Data
                );
            }
        }

        if (requestModel.Tags != null)
        {
            foreach (var tag in requestModel.Tags)
            {
                diploma.AddTag(
                    diploma.DiplomaId,
                    tag.Name
                );
            }
        }
        
        var reviewer = await _userRepository.GetByIdAsync(diploma.ReviewerId);

        if (reviewer is null)
        {
            throw new ArgumentException("Not found reviewer");
        }
        
        await _diplomaRepository.SaveChangesAsync();
        
        var emailMessage =
            $"Praca dyplomowa {diploma.DiplomaId}. Zaloguj się do systemu APD w celu jej oceny";
        await _emailSender.SendEmailAsync(reviewer.Email!, "Praca jest gotowa do recenzji.", emailMessage);
    }

    public async Task<DiplomaDto[]> SearchDiploma(DiplomaSearchRequestModel requestModel)
    {
        var diplomas = await _diplomaRepository.SearchDiplomaAsync(
            requestModel.SearchString,
            requestModel.StudentIds,
            requestModel.PromoterIds,
            requestModel.ReviewerIds,
            requestModel.Status,
            requestModel.PageNumber,
            requestModel.PageSize,
            requestModel.Tag
        );

        return diplomas.ToDto();
    }
    
    public async Task<DiplomaAttachmentFileDto?> GetAttachmentFile(long diplomaId, long attachmentId)
    {
        var diploma = await _diplomaRepository.GetByIdWithAttachmentsAsync(diplomaId);

        if (diploma is null)
        {
            return null;
        }

        var attachment = diploma.Attachments.AsEnumerable().FirstOrDefault(x => x.DiplomaAttachmentId == attachmentId);

        if (attachment is null)
        {
            return null;
        }
        
        var attachmentDto = attachment.ToFileDtoDto();
        
        return attachmentDto;
    }
}