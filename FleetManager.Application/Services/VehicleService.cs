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
                    Year = v.Year
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
                Year = vehicle.Year
            };
        }

        public async Task<VehicleDto> CreateAsync(CreateVehicleRequest request)
        {
            var vehicle = new Vehicle
            {
                PlateNumber = request.PlateNumber,
                Make = request.Make,
                Model = request.Model,
                Year = request.Year
            };

            _db.Vehicles.Add(vehicle);
            await _db.SaveChangesAsync();

            return new VehicleDto
            {
                Id = vehicle.Id,
                PlateNumber = vehicle.PlateNumber,
                Make = vehicle.Make,
                Model = vehicle.Model,
                Year = vehicle.Year
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
    }
}