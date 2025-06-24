using FleetManager.Domain.Entities;
using System;

namespace FleetManager.Application.DTOs
{
    public class CreateVehicleRequest
    {
        public string PlateNumber { get; set; } = string.Empty;
        public string Make { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int Year { get; set; }

        public VehicleStatus Status { get; set; }

        public int Kilometers { get; set; }

        public string VIN { get; set; } = string.Empty;

        public DateTime? LastInspectionDate { get; set; }
        public DateTime? NextInspectionDue { get; set; }

        public string? Location { get; set; }
        public string? Notes { get; set; }
    }
}