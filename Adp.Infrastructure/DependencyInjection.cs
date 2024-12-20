using System.Text;
using Adp.Domain.Diploma;
using Adp.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

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