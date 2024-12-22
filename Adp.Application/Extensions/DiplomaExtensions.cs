using Adp.Application.Dto;
using Adp.Domain.Diploma;

namespace Adp.Application.Extensions;

public static class DiplomaExtensions
{
    public static DiplomaDto ToDto(this Diploma diploma)
    {
        return new DiplomaDto()
        {
            DiplomaId = diploma.DiplomaId,
            Title = diploma.Title,
            Description = diploma.Description,
            DepartmentName = diploma.DepartmentName,
            Type = diploma.Type,
            Status = diploma.Status,
            StudentId = diploma.StudentId,
            CreateDate = diploma.CreateDate,
            PromoterId = diploma.PromoterId,
            ReviewerId = diploma.ReviewerId,
        };
    }
    
    public static DiplomaDto[] ToDto(this Diploma[] diplomas)
    {
        if(diplomas is null) return Array.Empty<DiplomaDto>();
        
        var diplomaDtos = new DiplomaDto[diplomas.Length];
        for (int i = 0; i < diplomas.Length; i++)
        {
            var diplomaDto = diplomas[i].ToDto();
            diplomaDtos[i] = diplomaDto;
        }
        return diplomaDtos;
    }
}