using FleetManager.Domain.Entities;
using FleetManager.Infrastructure.Data;
using Microsoft.Extensions.DependencyInjection;

namespace FleetManager.Infrastructure.Seeders;

public static class DbInitializer
{
    public static void Seed(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        if (!context.Vehicles.Any())
        {
            context.Vehicles.AddRange(
            [
                new Vehicle
                {
                    Id = Guid.NewGuid(),
                    PlateNumber = "9999-ABC",
                    Make = "Toyota",
                    Model = "Hilux",
                    Year = 2020,
                    Status = VehicleStatus.Maintenance,
                    Kilometers = 75000,
                    VIN = "JT1234567890123456",
                    LastInspectionDate = DateTime.SpecifyKind(DateTime.Parse("2024-01-10"), DateTimeKind.Utc),
                    NextInspectionDue = DateTime.SpecifyKind(DateTime.Parse("2025-01-10"), DateTimeKind.Utc),
                    Location = "Madrid",
                    Notes = "Revisión técnica próxima."
                },
                new Vehicle
                {
                    Id = Guid.NewGuid(),
                    PlateNumber = "1234-XYZ",
                    Make = "Renault",
                    Model = "Kangoo",
                    Year = 2018,
                    Status = VehicleStatus.Inactive,
                    Kilometers = 45000,
                    VIN = "VF1AA123456789012",
                    LastInspectionDate = DateTime.SpecifyKind(DateTime.Parse("2024-04-10"), DateTimeKind.Utc),
                    NextInspectionDue = DateTime.SpecifyKind(DateTime.Parse("2025-04-10"), DateTimeKind.Utc),
                    Location = "Barcelona",
                    Notes = "Última revisión OK."
                },
                new Vehicle
                {
                    Id = Guid.NewGuid(),
                    PlateNumber = "5678-DEF",
                    Make = "Peugeot",
                    Model = "Partner",
                    Year = 2016,
                    Status = VehicleStatus.Retired,
                    Kilometers = 76000,
                    VIN = "VF3BB987654321098",
                    LastInspectionDate = DateTime.SpecifyKind(DateTime.Parse("2024-03-15"), DateTimeKind.Utc),
                    NextInspectionDue = DateTime.SpecifyKind(DateTime.Parse("2025-03-15"), DateTimeKind.Utc),
                    Location = "Valencia",
                    Notes = "En taller por reparación de frenos."
                },
                new Vehicle
                {
                    Id = Guid.NewGuid(),
                    PlateNumber = "9012-GHI",
                    Make = "Citroën",
                    Model = "Berlingo",
                    Year = 2014,
                    Status = VehicleStatus.Active,
                    Kilometers = 110000,
                    VIN = "VF7CC654321987654",
                    LastInspectionDate = DateTime.SpecifyKind(DateTime.Parse("2023-01-12"), DateTimeKind.Utc),
                    NextInspectionDue = DateTime.SpecifyKind(DateTime.Parse("2024-01-12"), DateTimeKind.Utc),
                    Location = "Sevilla",
                    Notes = "Vehículo activo en flota."
                },
                new Vehicle
                {
                    Id = Guid.NewGuid(),
                    PlateNumber = "4321-JKL",
                    Make = "Ford",
                    Model = "Transit",
                    Year = 2019,
                    Status = VehicleStatus.Active,
                    Kilometers = 90000,
                    VIN = "1FTNE2CM5KKA12345",
                    LastInspectionDate = DateTime.SpecifyKind(DateTime.Parse("2024-05-20"), DateTimeKind.Utc),
                    NextInspectionDue = DateTime.SpecifyKind(DateTime.Parse("2025-05-20"), DateTimeKind.Utc),
                    Location = "Bilbao",
                    Notes = "Sin incidencias recientes."
                },
                new Vehicle
                {
                    Id = Guid.NewGuid(),
                    PlateNumber = "8765-MNO",
                    Make = "Volkswagen",
                    Model = "Caddy",
                    Year = 2017,
                    Status = VehicleStatus.Maintenance,
                    Kilometers = 85000,
                    VIN = "WV1ZZZ2HZHH123456",
                    LastInspectionDate = DateTime.SpecifyKind(DateTime.Parse("2024-05-10"), DateTimeKind.Utc),
                    NextInspectionDue = DateTime.SpecifyKind(DateTime.Parse("2025-02-10"), DateTimeKind.Utc),
                    Location = "Madrid",
                    Notes = "En mantenimiento programado."
                },
                new Vehicle
                {
                    Id = Guid.NewGuid(),
                    PlateNumber = "3456-PQR",
                    Make = "Nissan",
                    Model = "NV200",
                    Year = 2015,
                    Status = VehicleStatus.Retired,
                    Kilometers = 120000,
                    VIN = "JN1BVAN12JM123456",
                    LastInspectionDate = DateTime.SpecifyKind(DateTime.Parse("2024-02-10"), DateTimeKind.Utc),
                    NextInspectionDue = DateTime.SpecifyKind(DateTime.Parse("2025-03-10"), DateTimeKind.Utc),
                    Location = "Zaragoza",
                    Notes = "Vehículo fuera de servicio temporalmente."
                },
                new Vehicle
                {
                    Id = Guid.NewGuid(),
                    PlateNumber = "7890-STU",
                    Make = "Mercedes-Benz",
                    Model = "Sprinter",
                    Year = 2021,
                    Status = VehicleStatus.Active,
                    Kilometers = 30000,
                    VIN = "WDB90665412345678",
                    LastInspectionDate = DateTime.SpecifyKind(DateTime.Parse("2024-06-10"), DateTimeKind.Utc),
                    NextInspectionDue = DateTime.SpecifyKind(DateTime.Parse("2025-06-10"), DateTimeKind.Utc),
                    Location = "Valencia",
                    Notes = "Vehículo nuevo, en uso activo."
                }
            ]);

            context.SaveChanges();
        }
    }
}