using Adp.Domain.Diploma;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace Adp.Infrastructure.Repositories;

public class DiplomaRepository(ApdDbContext _context) : IDiplomaRepository
{
    public async Task<Diploma?> AddAsync(Diploma diploma)
    {
        var res = await _context.Diplomas.AddAsync(diploma);
        return res.Entity;
    }

    public async Task<Diploma?> GetByIdAsync(long id)
    {
        return await _context.Diplomas
            .Include(x => x.Attachments)
            .FirstOrDefaultAsync(x => x.DiplomaId == id);
    }

    public async Task<int> SaveChangesAsync()
    {
        var res = await _context.SaveChangesAsync();
        return res;
    }

    public async Task<Diploma[]> SearchDiplomaAsync(
        string? searchString, 
        string[]? studentIds, 
        string[]? promoterIds, 
        string[]? reviewerIds, 
        string? status,
        int pageNumber,
        int pageSize,
        string? tag
    )
    {
        IQueryable<Diploma> query = _context.Diplomas
            .Include(x => x.Tags)
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(searchString))
        {
            query = query.Where(d => d.Title.Contains(searchString) || d.Course.Contains(searchString));
        }

        if (studentIds != null && studentIds.Length > 0)
        {
            query = query.Where(x => studentIds.Contains(x.StudentId));
        }

        if (promoterIds != null && promoterIds.Length > 0)
        {
            query = query.Where(d => promoterIds.Contains(d.PromoterId));
        }

        if (reviewerIds != null && reviewerIds.Length > 0)
        {
            query = query.Where(d => reviewerIds.Contains(d.ReviewerId));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(d => d.Status == status);
        }

        if (!string.IsNullOrWhiteSpace(tag))
        {
            query = query.Where(x => x.Tags.Any(x => x.Name.Contains(tag)));
        }

        if (pageNumber > 0 && pageSize > 0)
        {
            query = query.Skip((pageNumber - 1) * pageSize).Take(pageSize);
        }
        
        return await query.ToArrayAsync();
    }
}