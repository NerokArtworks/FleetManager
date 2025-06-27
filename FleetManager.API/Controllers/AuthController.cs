using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FleetManager.Application.DTOs;
using FleetManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<ApplicationUser> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            FirstName = model.FirstName,
            LastName = model.LastName,
            CompanyName = model.CompanyName
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded) return BadRequest(result.Errors);

        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null) return Unauthorized();

        var validPassword = await _userManager.CheckPasswordAsync(user, model.Password);
        if (!validPassword) return Unauthorized();

        var token = GenerateJwtToken(user);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = false, // En desarrollo local puedes poner false
            SameSite = SameSiteMode.Lax,
            Expires = DateTime.UtcNow.AddHours(1)
        };

        Response.Cookies.Append("access_token", token, cookieOptions);

        return Ok(new { message = "Logged in" });
    }

    [HttpGet("checkcookie")]
    public IActionResult CheckCookie()
    {
        var cookie = Request.Cookies["access_token"];
        return Ok(new { cookie = cookie ?? "no cookie" });
    }


    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("access_token");
        return Ok();
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        Console.WriteLine("Entering Me");
        // Comprobar que hay usuario autenticado
        if (!User.Identity?.IsAuthenticated ?? true)
            return Unauthorized();

        Console.WriteLine($"Entering Me 2: {ClaimTypes.NameIdentifier}");

        // Obtener user id del claim
        var userEmail = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Console.WriteLine($"wtf:  {userEmail}");
        if (userEmail == null)
            return Unauthorized();

        // Buscar usuario en BD
        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null)
            return Unauthorized();

        // Devolver info mínima (sin datos sensibles)
        return Ok(new
        {
            email = user.Email,
            firstname = user.FirstName,
            lastname = user.LastName,
            companyName = user.CompanyName
        });
    }


    private string GenerateJwtToken(ApplicationUser user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email ?? throw new ArgumentNullException(nameof(user.Email))),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id)
        };

        var jwtKey = _configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is not configured.");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}