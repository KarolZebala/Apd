using Adp.Domain.Diploma;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

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

public class ApdDbContext : IdentityDbContext<IdentityUser>
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

    public DbSet<Diploma?> Diplomas { get; set; }
}