using AutoMapper;
using FleetManager.Application.DTOs;
using FleetManager.Domain.Entities;

public class VehicleProfile : Profile
{
    public VehicleProfile()
    {
        // Domain -> DTO
        CreateMap<Vehicle, VehicleDto>().ReverseMap();

        // DTO -> Domain
        CreateMap<CreateVehicleRequest, Vehicle>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedAt, opt => opt.Ignore())
            .ForMember(dest => dest.LastUpdated, opt => opt.Ignore());
    }
}