using Apd.Api.Activities;
using Elsa.Activities.Console;
using Elsa.Activities.Primitives;
using Elsa.Builders;


namespace Apd.Api.Workflows;

public class DiplomaWorkflow : Elsa.Models.WorkflowInstance, IWorkflow
{
    public void Build(IWorkflowBuilder builder)
    {
        builder
            .WithWorkflowDefinitionId("DiplomaWorkflow")
            .StartWith<WriteLine>(x => x.Set(p => p.Text, "Diploma workflow started!"))
            .Then<TestActivity>()
            .Then<NotifyStudentActivity>();
    }
}