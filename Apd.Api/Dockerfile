FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 5095

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Relese
WORKDIR /src
COPY ["Apd.Api/Apd.Api.csproj", "Apd.Api/"]
COPY ["Adp.Application/Adp.Application.csproj", "Adp.Application/"]
COPY ["Adp.Infrastructure/Adp.Infrastructure.csproj", "Adp.Infrastructure/"]
RUN dotnet restore "Apd.Api/Apd.Api.csproj"
COPY . .
WORKDIR "/src/Apd.Api"
RUN dotnet build "Apd.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Apd.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Apd.Api.dll"]
