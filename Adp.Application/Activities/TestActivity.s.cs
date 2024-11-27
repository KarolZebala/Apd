using System.Diagnostics;
using Adp.Application.Services;
using Elsa.ActivityResults;
using Elsa.Services.Models;
using Elsa.Services;
using Elsa.Activities.Console;

namespace Apd.Api.Activities;

public class TestActivity : Elsa.Services.Activity
{
    private readonly IDiplomaService _diplomaService;

    public TestActivity(IDiplomaService diplomaService)
    {
        _diplomaService = diplomaService;
    }
    protected override IActivityExecutionResult OnExecute(ActivityExecutionContext context)
    {
        Debug.WriteLine("Hello, World! Debug");
        Console.WriteLine("Hello, World1 Console");
        var diploma = _diplomaService.GetDiplomaById(1).GetAwaiter().GetResult();
        
        Console.WriteLine($"Diploma: {diploma?.DiplomaId}");
        Debug.WriteLine($"Diploma: {diploma?.DiplomaId}");
        
        return Done();
    }
}