using Adp.Application.Dto;
using Adp.Application.Extensions;
using Adp.Domain.Diploma;
using Apd.Api.Workflows;
using Elsa.Models;
using Elsa.Services;
using Elsa.Services.Models;

namespace Adp.Application.Services;

public interface IDiplomaService
{
    Task<long> AddDiploma(DiplomaDto diplomaDto);
    Task<DiplomaDto> GetDiplomaById(long diplomaId);
}

public class DiplomaService : IDiplomaService
{
    private readonly IDiplomaRepository _diplomaRepository;
    /*private readonly IWorkflowLaunchpad _workflowLaunchpad;
    private readonly IWorkflowDispatcher _workflowDispatcher;
    private readonly IWorkflowRunner _workflowRunner;*/
    private readonly IBuildsAndStartsWorkflow _buildsAndStartsWorkflow;
    /*private readonly IWorkflowFactory _workflowFactory;
    private readonly IWorkflowRegistry _workflowRegistry;*/

    public DiplomaService(
        IDiplomaRepository diplomaRepository,
        /*IWorkflowLaunchpad workflowLaunchpad,
        IWorkflowDispatcher workflowDispatcher,
        IWorkflowRunner workflowRunner,*/
        IBuildsAndStartsWorkflow buildsAndStartsWorkflow
        /*IWorkflowFactory workflowFactory,
        IWorkflowRegistry workflowRegistry*/
    )
    {
        _diplomaRepository = diplomaRepository;
        /*_workflowLaunchpad = workflowLaunchpad;
        _workflowDispatcher = workflowDispatcher;
        _workflowRunner = workflowRunner;*/
        _buildsAndStartsWorkflow = buildsAndStartsWorkflow;
        /*_workflowFactory = workflowFactory;
        _workflowRegistry = workflowRegistry;*/
    }

    public async Task<long> AddDiploma(DiplomaDto diplomaDto)
    {
        var diploma = Domain.Diploma.Diploma.Create(
            title: diplomaDto.Title,
            type: diplomaDto.Type,
            description: diplomaDto.Description,
            departmentName: diplomaDto.DepartmentName,
            course: diplomaDto.Course,
            studentId: diplomaDto.StudentId,
            promoterId: diplomaDto.PromoterId,
            reviewerId: diplomaDto.ReviewerId
        );
        
        await _diplomaRepository.AddAsync(diploma);

        await _diplomaRepository.SaveChangesAsync();
        
        
        // Dispatch workflow
        /*
        var workflowDefinitionId = "TestWorkflow"; // Use the workflow definition ID or name
        var input = new WorkflowInput(new { DiplomaId = diploma.DiplomaId, diploma.Title }, "diploma");
        await _workflowDispatcher.DispatchAsync(new TriggerWorkflowsRequest(workflowDefinitionId, new NullBookmark(), input));
        */

        
        //dziala
        var a =await _buildsAndStartsWorkflow.BuildAndStartWorkflowAsync<DiplomaWorkflow>();
        
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
}