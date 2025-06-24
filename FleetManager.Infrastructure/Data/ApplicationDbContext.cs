using Microsoft.EntityFrameworkCore;
using FleetManager.Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace FleetManager.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Vehicle> Vehicles => Set<Vehicle>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Vehicle>(entity =>
        {
            entity.HasKey(v => v.Id);
            entity.Property(v => v.PlateNumber).IsRequired().HasMaxLength(20);
        });
    }
}
