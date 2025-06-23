namespace FleetManager.Domain.Entities;

public class Vehicle
{
    public Guid Id { get; set; }
    public string PlateNumber { get; set; } = null!;
    public string Make { get; set; } = null!;
    public string Model { get; set; } = null!;
    public int Year { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}