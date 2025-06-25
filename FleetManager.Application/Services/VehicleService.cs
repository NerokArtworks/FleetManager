using FleetManager.Application.DTOs;
using FleetManager.Domain.Entities;
using FleetManager.Infrastructure.Data;
using FleetManager.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace FleetManager.Application.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public VehicleService(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<IEnumerable<VehicleDto>> GetAllAsync()
        {
            var vehicles = await _db.Vehicles.ToListAsync();
            return _mapper.Map<List<VehicleDto>>(vehicles);
        }

        public async Task<IEnumerable<VehicleDto>> GetAllAsync(
            VehicleStatus? status = null,
            string? search = null,
            string? sortBy = null,
            bool sortDesc = false)
        {
            var query = _db.Vehicles.AsQueryable();

            if (status.HasValue)
            {
                query = query.Where(v => v.Status == status.Value);
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(v =>
                    v.PlateNumber.Contains(search) ||
                    v.Make.Contains(search) ||
                    v.Model.Contains(search));
            }

            query = sortBy?.ToLower() switch
            {
                "plate" => sortDesc ? query.OrderByDescending(v => v.PlateNumber) : query.OrderBy(v => v.PlateNumber),
                "model" => sortDesc ? query.OrderByDescending(v => v.Model) : query.OrderBy(v => v.Model),
                "year" => sortDesc ? query.OrderByDescending(v => v.Year) : query.OrderBy(v => v.Year),
                "status" => sortDesc ? query.OrderByDescending(v => v.Status) : query.OrderBy(v => v.Status),
                _ => query.OrderBy(v => v.PlateNumber)
            };

            var vehicles = await query.ToListAsync();

            return _mapper.Map<List<VehicleDto>>(vehicles);
        }

        public async Task<VehicleDto?> GetByIdAsync(Guid id)
        {
            var vehicle = await _db.Vehicles.FindAsync(id);
            if (vehicle == null) return null;

            return _mapper.Map<VehicleDto>(vehicle);
        }

        public async Task<VehicleDto> CreateAsync(CreateVehicleRequest request)
        {
            var vehicle = _mapper.Map<Vehicle>(request);
            
            if (vehicle.LastInspectionDate.HasValue)
                vehicle.LastInspectionDate = DateTime.SpecifyKind(vehicle.LastInspectionDate.Value, DateTimeKind.Utc);

            if (vehicle.NextInspectionDue.HasValue)
                vehicle.NextInspectionDue = DateTime.SpecifyKind(vehicle.NextInspectionDue.Value, DateTimeKind.Utc);

            vehicle.CreatedAt = DateTime.UtcNow;
            vehicle.LastUpdated = DateTime.UtcNow;

            _db.Vehicles.Add(vehicle);
            await _db.SaveChangesAsync();

            return _mapper.Map<VehicleDto>(vehicle);
        }

        public async Task UpdateAsync(Guid id, CreateVehicleRequest request)
        {
            var vehicle = await _db.Vehicles.FindAsync(id);
            if (vehicle == null)
                throw new KeyNotFoundException($"Vehicle with id {id} not found.");

            _mapper.Map(request, vehicle);
            vehicle.LastUpdated = DateTime.UtcNow;

            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var vehicle = await _db.Vehicles.FindAsync(id);
            if (vehicle == null)
                throw new KeyNotFoundException($"Vehicle with id {id} not found.");

            _db.Vehicles.Remove(vehicle);
            await _db.SaveChangesAsync();
        }

        public async Task<(IEnumerable<VehicleDto>, int)> GetPagedAsync(
            int page,
            int pageSize,
            VehicleStatus? status,
            string? search,
            string? sortBy,
            bool sortDesc)
        {
            IQueryable<Vehicle> query = _db.Vehicles.AsQueryable();

            if (status.HasValue)
                query = query.Where(v => v.Status == status.Value);

            if (!string.IsNullOrEmpty(search))
            {
                var lowered = search.ToLower();
                query = query.Where(v => v.PlateNumber.ToLower().Contains(lowered)
                                      || v.Model.ToLower().Contains(lowered));
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                query = sortBy.ToLower() switch
                {
                    "name" => sortDesc ? query.OrderByDescending(v => v.Model) : query.OrderBy(v => v.Model),
                    "lastupdate" => sortDesc ? query.OrderByDescending(v => v.LastUpdated) : query.OrderBy(v => v.LastUpdated),
                    _ => query.OrderBy(v => v.Model)
                };
            }
            else
            {
                query = query.OrderBy(v => v.Model);
            }

            int total = await query.CountAsync();

            var vehicles = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var dtos = _mapper.Map<List<VehicleDto>>(vehicles);

            IEnumerable<VehicleDto> result = dtos;
            return (result, total);
        }

        public async Task<int> CountByStatusAsync(VehicleStatus status)
        {
            return await _db.Vehicles.CountAsync(v => v.Status == status);
        }

        public async Task<int> CountAll()
        {
            return await _db.Vehicles.CountAsync();
        }
    }
}