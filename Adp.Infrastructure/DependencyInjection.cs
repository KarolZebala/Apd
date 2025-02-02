using System.Text;
using Adp.Domain;
using Adp.Domain.BuildingBlocks;
using Adp.Domain.Diploma;
using Adp.Domain.Exam;
using Adp.Infrastructure.BuildingBlocks;
using Adp.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Adp.Infrastructure.BuildingBlocks;
using Adp.Infrastructure.Repositories.User;

namespace Adp.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Add PostgreSQL
        var connectionString = configuration.GetConnectionString("Postgres");
        services.AddDbContext<ApdDbContext>(options =>
            options.UseNpgsql(connectionString));
        
        services.AddDbContext<WorkflowDbContext>(options =>
            options.UseNpgsql(connectionString));

        // Add Identity
        services.AddIdentity<IdentityUser, IdentityRole>()
            .AddEntityFrameworkStores<ApdDbContext>()
            .AddDefaultTokenProviders();

        services.AddScoped<IDiplomaRepository, DiplomaRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IDiplomaReviewRepository, DiplomaReviewRepository>();
        services.AddScoped<IExamRepository, ExamRepository>();
        services.AddScoped<IEmailSender, EmailSender>();
        
        return services;
    }

    public static IApplicationBuilder ApplyMigration(this IApplicationBuilder app)
    {
        using (var scope = app.ApplicationServices.CreateScope())
        {
            using (var context = scope.ServiceProvider.GetRequiredService<ApdDbContext>())
            {
                context.Database.Migrate();
            }
        }
        
        return app;
    }
}