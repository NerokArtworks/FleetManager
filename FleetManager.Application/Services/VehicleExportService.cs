using System.Text;
using FleetManager.Application.DTOs;
using FleetManager.Application.Interfaces;

public class VehicleExportService : IVehicleExportService
{
    public string GenerateCsv(IEnumerable<VehicleDto> vehicles)
    {
        var sb = new StringBuilder();
        sb.AppendLine("Id,Model,Plate,Status,CreatedAt");
        foreach (var v in vehicles)
        {
            var line = $"{v.Id},{EscapeCsv(v.Model)},{EscapeCsv(v.PlateNumber)},{v.Status},{v.CreatedAt:yyyy-MM-dd}";
            sb.AppendLine(line);
        }
        return sb.ToString();
    }

    private string EscapeCsv(string value)
    {
        if (string.IsNullOrEmpty(value)) return "";
        if (value.Contains(",") || value.Contains("\"") || value.Contains("\n"))
        {
            value = value.Replace("\"", "\"\"");
            return $"\"{value}\"";
        }
        return value;
    }
}