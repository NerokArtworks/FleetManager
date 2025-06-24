namespace FleetManager.Domain.Entities
{
    public enum VehicleStatus
    {
        Active,
        Inactive,
        Maintenance,
        Retired
    }

    public class Vehicle
    {
        public Guid Id { get; set; }
        public string PlateNumber { get; set; } = null!;
        public string Make { get; set; } = null!;
        public string Model { get; set; } = null!;
        public int Year { get; set; }

        // Estado actual del vehículo
        public VehicleStatus Status { get; set; } = VehicleStatus.Active;

        // Kilometraje actual
        public int Kilometers { get; set; } = 0;

        // Número de bastidor (VIN)
        public string VIN { get; set; } = null!;

        // Fecha de adquisición o registro en sistema
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Fecha de última revisión técnica (ITV)
        public DateTime? LastInspectionDate { get; set; }

        // Fecha próxima revisión técnica
        public DateTime? NextInspectionDue { get; set; }

        // Fecha de la última actualización de estado o kilometraje
        public DateTime? LastUpdated { get; set; }

        // Opcional: ubicación actual
        public string? Location { get; set; }

        // Opcional: notas o comentarios libres
        public string? Notes { get; set; }
    }
}