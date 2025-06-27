restore:
	dotnet restore FleetManager.sln

build:
	dotnet build FleetManager.sln

clean:
	dotnet clean FleetManager.sln

run:
	dotnet run --project FleetManager.API

update:
	dotnet ef database update --project FleetManager.Infrastructure --startup-project FleetManager.API

test:
	dotnet test FleetManager.Tests/FleetManager.Tests.csproj