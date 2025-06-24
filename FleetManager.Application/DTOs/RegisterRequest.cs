namespace FleetManager.Application.DTOs;

public class RegisterRequest
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? CompanyName { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
}