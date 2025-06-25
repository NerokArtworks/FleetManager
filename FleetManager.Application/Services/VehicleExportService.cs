using System.Reflection;
using System.Text;
using FleetManager.Application.DTOs;
using FleetManager.Application.Interfaces;

public class VehicleExportService : IVehicleExportService
{
    public string GenerateCsv(IEnumerable<VehicleDto> vehicles)
    {
        var sb = new StringBuilder();

        var type = typeof(VehicleDto);
        var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);

        // Cabecera
        sb.AppendLine(string.Join(",", properties.Select(p => p.Name)));

        // Filas
        foreach (var v in vehicles)
        {
            var values = properties.Select(p =>
            {
                var value = p.GetValue(v);
                return EscapeCsv(value?.ToString() ?? "");
            });

            sb.AppendLine(string.Join(",", values));
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