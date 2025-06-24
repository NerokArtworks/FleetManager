# FleetManager

## Vehicle examples
```
// Vehículo 1: Toyota Hilux, en mantenimiento
{
  "plateNumber": "9999-ABC",
  "make": "Toyota",
  "model": "Hilux",
  "year": 2020,
  "status": 2,
  "kilometers": 75000,
  "vin": "JT1234567890123456",
  "lastInspectionDate": "2024-01-10T00:00:00Z",
  "nextInspectionDue": "2025-01-10T00:00:00Z",
  "location": "Madrid",
  "notes": "Revisión técnica próxima."
}

// Vehículo 2: Renault Kangoo, inactivo
{
  "plateNumber": "1234-XYZ",
  "make": "Renault",
  "model": "Kangoo",
  "year": 2018,
  "status": 1,
  "kilometers": 45000,
  "vin": "VF1AA123456789012",
  "lastInspectionDate": "2024-04-10T00:00:00Z",
  "nextInspectionDue": "2025-04-10T00:00:00Z",
  "location": "Barcelona",
  "notes": "Última revisión OK."
}

// Vehículo 3: Peugeot Partner, retirado por mantenimiento
{
  "plateNumber": "5678-DEF",
  "make": "Peugeot",
  "model": "Partner",
  "year": 2016,
  "status": 3,
  "kilometers": 76000,
  "vin": "VF3BB987654321098",
  "lastInspectionDate": "2024-03-15T00:00:00Z",
  "nextInspectionDue": "2025-03-15T00:00:00Z",
  "location": "Valencia",
  "notes": "En taller por reparación de frenos."
}

// Vehículo 4: Citroën Berlingo, activo y operativo
{
  "plateNumber": "9012-GHI",
  "make": "Citroën",
  "model": "Berlingo",
  "year": 2014,
  "status": 0,
  "kilometers": 110000,
  "vin": "VF7CC654321987654",
  "lastInspectionDate": "2023-12-01T00:00:00Z",
  "nextInspectionDue": "2024-12-01T00:00:00Z",
  "location": "Sevilla",
  "notes": "Vehículo activo en flota."
}

// Vehículo 5: Ford Transit, sin incidencias recientes
{
  "plateNumber": "4321-JKL",
  "make": "Ford",
  "model": "Transit",
  "year": 2019,
  "status": 0,
  "kilometers": 90000,
  "vin": "1FTNE2CM5KKA12345",
  "lastInspectionDate": "2024-05-20T00:00:00Z",
  "nextInspectionDue": "2025-05-20T00:00:00Z",
  "location": "Bilbao",
  "notes": "Sin incidencias recientes."
}

// Vehículo 6: Volkswagen Caddy, en mantenimiento programado
{
  "plateNumber": "8765-MNO",
  "make": "Volkswagen",
  "model": "Caddy",
  "year": 2017,
  "status": 2,
  "kilometers": 85000,
  "vin": "WV1ZZZ2HZHH123456",
  "lastInspectionDate": "2024-02-18T00:00:00Z",
  "nextInspectionDue": "2025-02-18T00:00:00Z",
  "location": "Madrid",
  "notes": "En mantenimiento programado."
}

// Vehículo 7: Nissan NV200, retirado temporalmente
{
  "plateNumber": "3456-PQR",
  "make": "Nissan",
  "model": "NV200",
  "year": 2015,
  "status": 3,
  "kilometers": 120000,
  "vin": "JN1BVAN12JM123456",
  "lastInspectionDate": "2023-11-10T00:00:00Z",
  "nextInspectionDue": "2024-11-10T00:00:00Z",
  "location": "Zaragoza",
  "notes": "Vehículo fuera de servicio temporalmente."
}

// Vehículo 8: Mercedes-Benz Sprinter, nuevo y activo
{
  "plateNumber": "7890-STU",
  "make": "Mercedes-Benz",
  "model": "Sprinter",
  "year": 2021,
  "status": 0,
  "kilometers": 30000,
  "vin": "WDB90665412345678",
  "lastInspectionDate": "2024-06-01T00:00:00Z",
  "nextInspectionDue": "2025-06-01T00:00:00Z",
  "location": "Valencia",
  "notes": "Vehículo nuevo, en uso activo."
}

```