using Adp.Application.Dto;
using Adp.Application.Extensions;
using Adp.Application.RequestModel;
using Adp.Domain;
using Adp.Domain.BuildingBlocks;
using Adp.Domain.Diploma;
using Adp.Domain.Exam;

namespace Adp.Application.Services;

public interface IExamService
{
    Task<long> CreateExam(CreateExamRequestModel requestModel);
    Task UpdateExam(UpdateExamRequestModel requestModel);
    Task<ExamDto?> GetByIdAsync(long id);
    Task<ExamDto[]> SearchExams(SearchExamRequestModel requestModel);
}

public class ExamService : IExamService
{
    private readonly IExamRepository _examRepository;
    private readonly IDiplomaRepository _diplomaRepository;
    private readonly IUserRepository _userRepository;
    private readonly IEmailSender _emailSender;

    public ExamService(
        IExamRepository examRepository, 
        IDiplomaRepository diplomaRepository,
        IUserRepository userRepository,
        IEmailSender emailSender
    )
    {
        _examRepository = examRepository;
        _diplomaRepository = diplomaRepository;
        _userRepository = userRepository;
        _emailSender = emailSender;
    }

    public async Task<long> CreateExam(CreateExamRequestModel requestModel)
    {
        var exam = Exam.CreateNew(requestModel.DiplomaId, requestModel.ExamDate, requestModel.Score);
        
        var diploma = await _diplomaRepository.GetByIdAsync(exam.DiplomaId);

        if (diploma is null)
        {
            throw new ArgumentException($"Not found diploma with id: {exam.DiplomaId}");
        }

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
        
        await _examRepository.AddAsync(exam);

        await _diplomaRepository.SaveChangesAsync();
        
        //send emails
        await _emailSender.SendEmailAsync(student.Email!, "Dodano egzamin", "Twój egzamin został utworzony");
        await _emailSender.SendEmailAsync(promoter.Email!, "Dodano egzamin", "Twój egzamin został utworzony");
        await _emailSender.SendEmailAsync(reviewer.Email!, "Dodano egzamin", "Twój egzamin został utworzony");

        return exam.ExamId;
    }

    public async Task UpdateExam(UpdateExamRequestModel requestModel)
    {
        var exam = await _examRepository.GetByIdAsync(requestModel.ExamId);

        if (exam is null)
        {
            throw new ArgumentException($"Not found exam with id: {requestModel.ExamId}");
        }
        
        exam.Update(requestModel.ExamDate, requestModel.Score);
        
        var diploma = await _diplomaRepository.GetByIdAsync(exam.DiplomaId);

        if (diploma is null)
        {
            throw new ArgumentException($"Not found diploma with id: {exam.DiplomaId}");
        }

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

        await _diplomaRepository.SaveChangesAsync();
        
        //send emails
        await _emailSender.SendEmailAsync(student.Email!, "Edytowano egzamin", "Twój egzamin został edytowany");
        await _emailSender.SendEmailAsync(promoter.Email!, "Edytowano egzamin", "Twój egzamin został edytowany");
        await _emailSender.SendEmailAsync(reviewer.Email!, "Edytowano egzamin", "Twój egzamin został edytowany");
    }
    
    public async Task<ExamDto?> GetByIdAsync(long id)
    {
        var exam = await _examRepository.GetByIdAsync(id);
        
        if (exam is null)
        {
            return null;
        }

        var dto = exam.ToDto();
        return dto;
    }

    public async Task<ExamDto[]> SearchExams(SearchExamRequestModel requestModel)
    {
        var exams = await _examRepository.GetExamsAsync(requestModel.PageNumber, requestModel.PageSize);

        var dtos = exams.ToDto();
        return dtos;
    }
}