using FleetManager.Application.DTOs;

namespace FleetManager.Application.Interfaces
{
    public interface IVehicleExportService
    {
        string GenerateCsv(IEnumerable<VehicleDto> vehicles);
    }
}