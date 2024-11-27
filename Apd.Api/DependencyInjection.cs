using Apd.Api.Activities;
using Apd.Api.Workflows;
using Elsa.Services;
using Elsa.Persistence.EntityFramework.Core.Extensions;
using Microsoft.EntityFrameworkCore;

namespace Apd.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddElsaConfig(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddElsa(elsa => elsa
            /*.UseEntityFrameworkPersistence(ef => 
                ef.UseNpgsql(configuration.GetConnectionString("Postgres")), true)*/
            .AddConsoleActivities()
            .AddActivity<TestActivity>()
            .AddActivity<NotifyStudentActivity>()
           //.AddWorkflow<TestWorkflow>()
        );
        
        return services;
    }
}