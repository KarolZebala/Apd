using Adp.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Adp.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IDiplomaService, DiplomaService>();
        services.AddScoped<IDiplomaReviewService, DiplomaReviewService>();
        services.AddScoped<IExamService, ExamService>();
        
        return services;
    }
}