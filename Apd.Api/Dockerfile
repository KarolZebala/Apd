# Etap bazowy - środowisko uruchomieniowe
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
ENV DOTNET_RUNNING_IN_CONTAINER=true \
    DOTNET_VERSION=9.0.0 \
    ASPNETCORE_HTTP_PORTS=8080
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Etap budowania - SDK
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Instalacja narzędzia dotnet-ef globalnie
RUN dotnet tool install --global dotnet-ef --version 9.0.0

# Ustawienie ścieżki dla narzędzi dotnet
ENV PATH="$PATH:/root/.dotnet/tools"

# Kopiowanie plików projektu i przywracanie zależności
COPY ["Apd.Api/Apd.Api.csproj", "Apd.Api/"]
COPY ["Adp.Application/Adp.Application.csproj", "Adp.Application/"]
COPY ["Adp.Infrastructure/Adp.Infrastructure.csproj", "Adp.Infrastructure/"]
RUN dotnet restore "Apd.Api/Apd.Api.csproj"

# Kopiowanie reszty kodu źródłowego i budowanie aplikacji
COPY . .
WORKDIR "/src/Apd.Api"
RUN dotnet build "Apd.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Etap publikacji
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Apd.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Etap migracji
FROM build AS migrations
WORKDIR /src
COPY --from=publish /app/publish /app/publish
WORKDIR /app/publish

# Debugowanie - sprawdzenie struktury plików i uruchomienie migracji
RUN ls /app/publish
ENTRYPOINT ["dotnet", "ef", "database", "update", "--project", "/src/Apd.Api/Apd.Api.csproj"]

# Etap końcowy - obraz uruchomieniowy
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Instalacja powłoki bash (dla celów debugowania)
RUN apt-get update && apt-get install -y bash

# Punkt wejścia aplikacji
ENTRYPOINT ["dotnet", "Apd.Api.dll"]
