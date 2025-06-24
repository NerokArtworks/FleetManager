using FleetManager.Application.DTOs;
using FleetManager.Domain.Entities;
using FleetManager.Infrastructure.Data;
using FleetManager.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FleetManager.Application.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly ApplicationDbContext _db;

        public VehicleService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<IEnumerable<VehicleDto>> GetAllAsync()
        {
            return await _db.Vehicles
                .Select(v => new VehicleDto
                {
                    Id = v.Id,
                    PlateNumber = v.PlateNumber,
                    Make = v.Make,
                    Model = v.Model,
                    Year = v.Year,
                    Status = v.Status,
                    Kilometers = v.Kilometers,
                    VIN = v.VIN,
                    CreatedAt = v.CreatedAt,
                    LastInspectionDate = v.LastInspectionDate,
                    NextInspectionDue = v.NextInspectionDue,
                    LastUpdated = v.LastUpdated,
                    Location = v.Location,
                    Notes = v.Notes
                })
                .ToListAsync();
        }

        public async Task<VehicleDto?> GetByIdAsync(Guid id)
        {
            var vehicle = await _db.Vehicles.FindAsync(id);
            if (vehicle == null) return null;

            return new VehicleDto
            {
                Id = vehicle.Id,
                PlateNumber = vehicle.PlateNumber,
                Make = vehicle.Make,
                Model = vehicle.Model,
                Year = vehicle.Year,
                Status = vehicle.Status,
                Kilometers = vehicle.Kilometers,
                VIN = vehicle.VIN,
                CreatedAt = vehicle.CreatedAt,
                LastInspectionDate = vehicle.LastInspectionDate,
                NextInspectionDue = vehicle.NextInspectionDue,
                LastUpdated = vehicle.LastUpdated,
                Location = vehicle.Location,
                Notes = vehicle.Notes
            };
        }

        public async Task<VehicleDto> CreateAsync(CreateVehicleRequest request)
        {
            var vehicle = new Vehicle
            {
                PlateNumber = request.PlateNumber,
                Make = request.Make,
                Model = request.Model,
                Year = request.Year,
                Status = request.Status,
                Kilometers = request.Kilometers,
                VIN = request.VIN,
                CreatedAt = DateTime.UtcNow,
                LastInspectionDate = request.LastInspectionDate,
                NextInspectionDue = request.NextInspectionDue,
                LastUpdated = DateTime.UtcNow,
                Location = request.Location,
                Notes = request.Notes
            };

            _db.Vehicles.Add(vehicle);
            await _db.SaveChangesAsync();

            return new VehicleDto
            {
                Id = vehicle.Id,
                PlateNumber = vehicle.PlateNumber,
                Make = vehicle.Make,
                Model = vehicle.Model,
                Year = vehicle.Year,
                Status = vehicle.Status,
                Kilometers = vehicle.Kilometers,
                VIN = vehicle.VIN,
                CreatedAt = vehicle.CreatedAt,
                LastInspectionDate = vehicle.LastInspectionDate,
                NextInspectionDue = vehicle.NextInspectionDue,
                LastUpdated = vehicle.LastUpdated,
                Location = vehicle.Location,
                Notes = vehicle.Notes
            };
        }

        public async Task UpdateAsync(Guid id, CreateVehicleRequest request)
        {
            var vehicle = await _db.Vehicles.FindAsync(id);
            if (vehicle == null)
                throw new KeyNotFoundException($"Vehicle with id {id} not found.");

            vehicle.PlateNumber = request.PlateNumber;
            vehicle.Make = request.Make;
            vehicle.Model = request.Model;
            vehicle.Year = request.Year;
            vehicle.Status = request.Status;
            vehicle.Kilometers = request.Kilometers;
            vehicle.VIN = request.VIN;
            vehicle.LastInspectionDate = request.LastInspectionDate;
            vehicle.NextInspectionDue = request.NextInspectionDue;
            vehicle.LastUpdated = DateTime.UtcNow;
            vehicle.Location = request.Location;
            vehicle.Notes = request.Notes;

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

        public async Task<(IEnumerable<VehicleDto> Vehicles, int Total)> GetPagedAsync(int page, int pageSize)
        {
            var query = _db.Vehicles.AsNoTracking();

            var total = await query.CountAsync();

            var vehicles = await query
                .OrderBy(v => v.PlateNumber)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(v => new VehicleDto
                {
                    Id = v.Id,
                    PlateNumber = v.PlateNumber,
                    Make = v.Make,
                    Model = v.Model,
                    Year = v.Year,
                    Status = v.Status,
                    Kilometers = v.Kilometers,
                    VIN = v.VIN,
                    CreatedAt = v.CreatedAt,
                    LastInspectionDate = v.LastInspectionDate,
                    NextInspectionDue = v.NextInspectionDue,
                    LastUpdated = v.LastUpdated,
                    Location = v.Location,
                    Notes = v.Notes
                })
                .ToListAsync();

            return (vehicles, total);
        }

        public async Task<int> CountByStatusAsync(VehicleStatus status)
        {
            return await _db.Vehicles.CountAsync(v => v.Status == status);
        }
    }
}