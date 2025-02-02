using Adp.Application.Dto;
using Adp.Domain.Exam;

namespace Adp.Application.Extensions;

public static class ExamExtensions
{
    public static ExamDto ToDto(this Exam exam)
    {
        return new ExamDto()
        {
            ExamId = exam.ExamId,
            DiplomaId = exam.DiplomaId,
            ExamDate = exam.ExamDate,
            Score = exam.Score
        };
    }

    public static ExamDto[] ToDto(this IEnumerable<Exam> exams)
    {
        if (exams is null) return Array.Empty<ExamDto>();
        
        return exams.Select(x => x.ToDto()).ToArray();
    }
}
