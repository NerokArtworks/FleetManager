using FleetManager.Application.DTOs;
using FleetManager.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FleetManager.Application.Interfaces
{
    public interface IVehicleService
    {
        Task<IEnumerable<VehicleDto>> GetAllAsync();
        Task<VehicleDto?> GetByIdAsync(Guid id);
        Task<VehicleDto> CreateAsync(CreateVehicleRequest request);
        Task UpdateAsync(Guid id, CreateVehicleRequest request);
        Task DeleteAsync(Guid id);

        Task<(IEnumerable<VehicleDto> Vehicles, int Total)> GetPagedAsync(int page, int pageSize);
        Task<int> CountByStatusAsync(VehicleStatus status);
    }
}