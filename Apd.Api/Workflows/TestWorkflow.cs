using Apd.Api.Activities;
using Elsa.Builders;

namespace Apd.Api.Workflows;

public class TestWorkflow : IWorkflow
{
    public void Build(IWorkflowBuilder builder)
    {
        builder.StartWith<TestActivity>();
    }
}