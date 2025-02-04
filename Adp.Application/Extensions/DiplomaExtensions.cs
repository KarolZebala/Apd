using Adp.Application.Dto;
using Adp.Domain.Diploma;
using NetBox.Extensions;

namespace Adp.Application.Extensions;

public static class DiplomaExtensions
{
    public static DiplomaDto ToDto(this Diploma diploma)
    {
        var attachments = diploma.Attachments.ToDtos();
        var tags = diploma.Tags.ToDtos();
        
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
            
            Attachments = attachments,
            Tags = tags,
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

    public static DiplomaAttachmentDto[] ToDtos(this IEnumerable<DiplomaAttachment> diplomaAttachments)
    {
        if(diplomaAttachments is null) return Array.Empty<DiplomaAttachmentDto>();

        return diplomaAttachments.Select(x => x.ToDto()).ToArray();
    }

    public static DiplomaAttachmentDto ToDto(this DiplomaAttachment diplomaAttachment)
    {
        return new DiplomaAttachmentDto()
        {
            DiplomaAttachmentId = diplomaAttachment.DiplomaAttachmentId,
            Title = diplomaAttachment.Title,
            Extension = diplomaAttachment.Extension,
            Size = diplomaAttachment.Size
        };
    }

    public static DiplomaTagDto[] ToDtos(this IEnumerable<DiplomaTag> diplomaTags)
    {
        if (diplomaTags is null) return Array.Empty<DiplomaTagDto>();

        return diplomaTags.Select(x => x.ToDto()).ToArray();
    }

    public static DiplomaTagDto ToDto(this DiplomaTag diplomaTag)
    {
        return new DiplomaTagDto()
        {
            DiplomaTagId = diplomaTag.DiplomaTagId,
            Name = diplomaTag.Name,
        };
    }
}