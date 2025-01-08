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
    Task<DiplomaDto> GetDiplomaById(long diplomaId);
    Task UpdateDiploma(UpdateDiplomaDetailsRequestModel requestModel);
    Task<DiplomaDto[]> SearchDiploma(DiplomaSearchRequestModel requestModel);
}

public class DiplomaService : IDiplomaService
{
    private readonly IDiplomaRepository _diplomaRepository;
    /*private readonly IWorkflowLaunchpad _workflowLaunchpad;
    private readonly IWorkflowDispatcher _workflowDispatcher;
    private readonly IWorkflowRunner _workflowRunner;*/
    private readonly IBuildsAndStartsWorkflow _buildsAndStartsWorkflow;

    private readonly IUserRepository _userRepository;

    private readonly IEmailSender _emailSender;
    /*private readonly IWorkflowFactory _workflowFactory;
    private readonly IWorkflowRegistry _workflowRegistry;*/

    public DiplomaService(
        IDiplomaRepository diplomaRepository,
        /*IWorkflowLaunchpad workflowLaunchpad,
        IWorkflowDispatcher workflowDispatcher,
        IWorkflowRunner workflowRunner,*/
        IBuildsAndStartsWorkflow buildsAndStartsWorkflow
        /*IWorkflowFactory workflowFactory,
        IWorkflowRegistry workflowRegistry*/,
        IUserRepository userRepository,
        IEmailSender emailSender
    )
    {
        _diplomaRepository = diplomaRepository;
        /*_workflowLaunchpad = workflowLaunchpad;
        _workflowDispatcher = workflowDispatcher;
        _workflowRunner = workflowRunner;*/
        _buildsAndStartsWorkflow = buildsAndStartsWorkflow;
        _userRepository = userRepository;
        _emailSender = emailSender;
        /*_workflowFactory = workflowFactory;
        _workflowRegistry = workflowRegistry;*/
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

        var emailMessage =
            $"Dodano prace dyplomową {diploma.DiplomaId}. Zaloguj się do systemu APD w celu jej uzupełnienia";
        await _emailSender.SendEmailAsync(student.Email, "Dodano Twoją prace dyplomową do systemu.", emailMessage);
        
        // Dispatch workflow
        /*
        var workflowDefinitionId = "TestWorkflow"; // Use the workflow definition ID or name
        var input = new WorkflowInput(new { DiplomaId = diploma.DiplomaId, diploma.Title }, "diploma");
        await _workflowDispatcher.DispatchAsync(new TriggerWorkflowsRequest(workflowDefinitionId, new NullBookmark(), input));
        */

        
        //dziala
        //var a =await _buildsAndStartsWorkflow.BuildAndStartWorkflowAsync<DiplomaWorkflow>();
        
        //testowanie żeby uruchomić inaczej na razie się nie udało
        /*var workflowBluePrint = await _workflowRegistry.FindByNameAsync("TestWorkflow", VersionOptions.All);
        var workflowBluePrint1 = await _workflowRegistry.FindAsync("TestWorkflow", VersionOptions.All);
        var workflowInstance = await _workflowFactory.InstantiateAsync(workflowBluePrint);
        
        //nie zadzialalo z przekazywaniem danych
        var diplomaData = new Dictionary<string, IDictionary<string, object?>>
        {
            {
                "Diploma", new Dictionary<string, object?>
                {
                    { "Type", "Bachelor's Degree" },
                    { "FieldOfStudy", "Computer Science" },
                    { "University", "XYZ University" },
                    { "GraduationYear", 2024 },
                    { "IsHonors", true },
                    { "GraduationDate", new DateTime(2024, 6, 15) }
                }
            },
            {
                "Student", new Dictionary<string, object?>
                {
                    { "FirstName", "John" },
                    { "LastName", "Doe" },
                    { "StudentID", 123456 },
                    { "DateOfBirth", new DateTime(2000, 5, 12) },
                    { "Email", "john.doe@example.com" }
                }
            }
        };
        
        workflowInstance.ActivityData = diplomaData;
        await _workflowRunner.RunWorkflowAsync(workflowBluePrint, workflowInstance);*/
        
        return diploma.DiplomaId;
    }

    public async Task<DiplomaDto> GetDiplomaById(long diplomaId)
    {
        var diploma = await _diplomaRepository.GetByIdAsync(diplomaId);
        
        if (diploma == null)
        {
            throw new ArgumentException("Missing diploma");
        }
        
        var diplomaDto = diploma.ToDto();
        
        return diplomaDto;
    }

    /// <summary>
    /// Add extra information to diploma, add attachments to diploma
    /// </summary>
    public async Task UpdateDiploma(UpdateDiplomaDetailsRequestModel requestModel)
    {
        var diploma = await _diplomaRepository.GetByIdAsync(requestModel.DiplomaId);

        if (diploma == null)
        {
            throw new ArgumentException("Not found diploma");
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
                    attachment.Data
                );
            }
        }

        await _diplomaRepository.SaveChangesAsync();
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
            requestModel.PageSize
        );

        return diplomas.ToDto();
    }
}