using Elsa.ActivityResults;
using Elsa.Services;
using Elsa.Services.Models;

namespace Apd.Api.Activities;

public class TestActivity : Activity
{
    protected override IActivityExecutionResult OnExecute(ActivityExecutionContext context)
    {
        Console.WriteLine("Hello, World!");
        
        return Done();
    }
}