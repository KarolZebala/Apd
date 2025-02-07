using Adp.Domain.Diploma;
using Adp.Domain.Exam;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

using Elsa.Persistence.EntityFramework.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Reflection.Metadata;

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
            
            entity.HasMany(x => x.Reviews).WithOne().HasForeignKey(x => x.DiplomaId);
            entity.HasMany(x => x.Attachments).WithOne().HasForeignKey(x => x.DiplomaId);
            entity.HasMany(x => x.Tags).WithOne().HasForeignKey(x => x.DiplomaId);
            entity.HasMany(x => x.Exams).WithOne().HasForeignKey(x => x.DiplomaId);
            
            entity.HasOne(x => x.Student).WithMany().HasForeignKey(x => x.StudentId);
            entity.HasOne(x => x.Promoter).WithMany().HasForeignKey(x => x.PromoterId);
            entity.HasOne(x => x.Reviewer).WithMany().HasForeignKey(x => x.ReviewerId);
        });

        modelBuilder.Entity<DiplomaAttachment>(entity =>
        {
            entity.ToTable("DiplomaAttachment");
            entity.HasKey(x => x.DiplomaAttachmentId);
            entity.OwnsOne(x => x.Data);
        });

        modelBuilder.Entity<DiplomaTag>(entity =>
        {
            entity.ToTable("DiplomaTag");
            entity.HasKey(x => x.DiplomaTagId);
        });
        
        modelBuilder.Entity<DiplomaReview>(entity =>
        {
            entity.ToTable("DiplomaReview");
            entity.HasKey(x => x.DiplomaReviewId);
        });
        
        modelBuilder.Entity<Exam>(entity =>
        {
            entity.ToTable("Exam");
            entity.HasKey(x => x.ExamId);
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
    public DbSet<DiplomaReview?> Reviews { get; set; }
    public DbSet<Exam?> Exams { get; set; }
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