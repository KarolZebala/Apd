using Adp.Domain.Diploma;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

using Elsa.Persistence.EntityFramework.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Adp.Infrastructure;

public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApdDbContext>
{
    public ApdDbContext CreateDbContext(string[] args)
    {
        // Build a configuration to get the connection string (if needed)
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "..", "Apd.Api"))
            .AddJsonFile("appsettings.json")
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<ApdDbContext>();
        var connectionString = configuration.GetConnectionString("Postgres");

        // Configure the DbContext with the connection string
        optionsBuilder.UseNpgsql(connectionString);

        return new ApdDbContext(optionsBuilder.Options);
    }
}

public class ApdDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
{
    public ApdDbContext(DbContextOptions<ApdDbContext> options) :
        base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Diploma>(entity =>
        {
            entity.ToTable("Diploma");
            entity.HasKey(x => x.DiplomaId);
        });
        
        base.OnModelCreating(modelBuilder);
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.ConfigureWarnings(warnings =>
            warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
    }

    public DbSet<Diploma?> Diplomas { get; set; }
}

public class WorkflowDbContextFactory : IDesignTimeDbContextFactory<WorkflowDbContext>
{
    public WorkflowDbContext CreateDbContext(string[] args)
    {
        // Build a configuration to get the connection string (if needed)
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "..", "Apd.Api"))
            .AddJsonFile("appsettings.json")
            .Build();

        DbContextOptionsBuilder<WorkflowDbContext> optionsBuilder = new DbContextOptionsBuilder<WorkflowDbContext>();
        string? connectionString = configuration.GetConnectionString("Postgres");

        // Configure the DbContext with the connection string
        optionsBuilder.UseNpgsql(connectionString);
        DbContextOptions<WorkflowDbContext> options = optionsBuilder.Options;
        return new WorkflowDbContext(optionsBuilder.Options);
    }
}
public class WorkflowDbContext : ElsaContext
{
    public WorkflowDbContext(DbContextOptions<WorkflowDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Optionally configure Elsa-specific entities here
    }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        optionsBuilder.ConfigureWarnings(warnings =>
            warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
    }
}