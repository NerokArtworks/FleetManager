using FleetManager.Application.DTOs;
using FleetManager.Application.Interfaces;
using FleetManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class VehicleController : ControllerBase
{
    private readonly IVehicleService _vehicleService;
    private readonly IVehicleExportService _vehicleExporterService;

    public VehicleController(IVehicleService vehicleService, IVehicleExportService vehicleExporterService)
    {
        _vehicleService = vehicleService;
        _vehicleExporterService = vehicleExporterService;
    }

    // Listado paginado
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetVehicles(
        int page = 1,
        int pageSize = 10,
        VehicleStatus? status = null,
        string? search = null,
        string? sortBy = null,
        bool sortDesc = false)
    {
        if (page < 1) page = 1;
        if (pageSize < 1 || pageSize > 100) pageSize = 10;

        var (vehicles, total) = await _vehicleService.GetPagedAsync(page, pageSize, status, search, sortBy, sortDesc);

        return Ok(new { data = vehicles, total, page, pageSize });
    }

    [Authorize]
    [HttpGet("summary")]
    public async Task<IActionResult> GetVehiclesSummary()
    {
        var total = await _vehicleService.CountAll();
        var active = await _vehicleService.CountByStatusAsync(VehicleStatus.Active);
        var inactive = await _vehicleService.CountByStatusAsync(VehicleStatus.Inactive);
        var maintenance = await _vehicleService.CountByStatusAsync(VehicleStatus.Maintenance);
        var retired = await _vehicleService.CountByStatusAsync(VehicleStatus.Retired);

        return Ok(new { total, active, inactive, maintenance, retired });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var vehicle = await _vehicleService.GetByIdAsync(id);
        if (vehicle == null) return NotFound();
        return Ok(vehicle);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateVehicleRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var created = await _vehicleService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CreateVehicleRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            await _vehicleService.UpdateAsync(id, request);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }

        return NoContent();
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _vehicleService.DeleteAsync(id);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }

        return NoContent();
    }

    [Authorize]
    [HttpGet("export")]
    public async Task<IActionResult> ExportVehicles(
        VehicleStatus? status = null,
        string? search = null,
        string? sortBy = null,
        bool sortDesc = false)
    {
        var vehicles = await _vehicleService.GetAllAsync(status, search, sortBy, sortDesc);

        var csv = _vehicleExporterService.GenerateCsv(vehicles);

        var bytes = System.Text.Encoding.UTF8.GetBytes(csv);
        var stream = new MemoryStream(bytes);

        return File(stream, "text/csv", "vehicles.csv");
    }
}