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
        };
    }
}