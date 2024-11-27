using Adp.Application.Services;
using Elsa.ActivityResults;
using Elsa.Services.Models;

namespace Apd.Api.Activities;

public class NotifyStudentActivity : Elsa.Services.Activity
{
    private readonly IDiplomaService _diplomaService;

    public NotifyStudentActivity(IDiplomaService diplomaService)
    {
        _diplomaService = diplomaService;
    }
    protected override IActivityExecutionResult OnExecute(ActivityExecutionContext context)
    {
        //for now hardcoded 1
        //to do pass id of diploma in workflow context
        var diploma = _diplomaService.GetDiplomaById(1).GetAwaiter().GetResult();
        
        Console.WriteLine($"Student is notified, diploma id: {diploma?.DiplomaId}");
        
        return Done();
    }
}