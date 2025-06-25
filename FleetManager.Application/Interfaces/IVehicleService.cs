using FleetManager.Application.DTOs;
using FleetManager.Domain.Entities;

namespace FleetManager.Application.Interfaces
{
    public interface IVehicleService
    {
        Task<IEnumerable<VehicleDto>> GetAllAsync();
        Task<IEnumerable<VehicleDto>> GetAllAsync(
            VehicleStatus? status = null,
            string? search = null,
            string? sortBy = null,
            bool sortDesc = false
        );
        Task<VehicleDto?> GetByIdAsync(Guid id);
        Task<VehicleDto> CreateAsync(CreateVehicleRequest request);
        Task UpdateAsync(Guid id, CreateVehicleRequest request);
        Task DeleteAsync(Guid id);
        Task<(IEnumerable<VehicleDto> Vehicles, int Total)> GetPagedAsync(
            int page,
            int pageSize,
            VehicleStatus? status,
            string? search,
            string? sortBy,
            bool sortDesc
        );
        Task<int> CountByStatusAsync(VehicleStatus status);
        Task<int> CountAll();
    }
}