using Adp.Application.Dto;
using Adp.Application.Extensions;
using Adp.Domain.Diploma;

namespace Adp.Application.Services;

public interface IDiplomaService
{
    Task<long> AddDiploma(DiplomaDto diplomaDto);
    Task<DiplomaDto> GetDiplomaById(long diplomaId);
}

public class DiplomaService : IDiplomaService
{
    private readonly IDiplomaRepository _diplomaRepository;

    public DiplomaService(IDiplomaRepository diplomaRepository)
    {
        _diplomaRepository = diplomaRepository;
    }

    public async Task<long> AddDiploma(DiplomaDto diplomaDto)
    {
        var diploma = Domain.Diploma.Diploma.Create(diplomaDto.Title);
        
        await _diplomaRepository.AddAsync(diploma);

        await _diplomaRepository.SaveChangesAsync();

        return diploma.DiplomaId;
    }

    public async Task<DiplomaDto> GetDiplomaById(long diplomaId)
    {
        var diploma = await _diplomaRepository.GetByIdAsync(diplomaId);
        
        if (diploma == null)
        {
            throw new ArgumentException("Missing diploma");
        }
        
        var diplomaDto = diploma.ToDto();
        return diplomaDto;
    }
}