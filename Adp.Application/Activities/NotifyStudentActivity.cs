using Adp.Application.Services;
using Adp.Domain;
using Adp.Domain.BuildingBlocks;
using Elsa.ActivityResults;
using Elsa.Services.Models;

namespace Apd.Api.Activities;

public class NotifyStudentActivity : Elsa.Services.Activity
{
    private readonly IDiplomaService _diplomaService;
    private readonly IEmailSender _emailSender;
    private readonly IUserRepository _userRepository;

    public NotifyStudentActivity(
        IDiplomaService diplomaService,
        IEmailSender emailSender,
        IUserRepository userRepository
    )
    {
        _diplomaService = diplomaService;
        _emailSender = emailSender;
        _userRepository = userRepository;
    }
    protected override IActivityExecutionResult OnExecute(ActivityExecutionContext context)
    {
        //for now hardcoded 1
        //to do pass id of diploma in workflow context
        var diploma = _diplomaService.GetDiplomaById(1).GetAwaiter().GetResult();
        var student = _userRepository.GetByIdAsync(diploma.StudentId).GetAwaiter().GetResult();
        
/*
        var emailMessage =
            $"Dodano prace dyplomową {diploma.DiplomaId}. Zaloguj się do systemu APD w celu jej uzupełnienia";
        _emailSender.SendEmailAsync(student.Email, "Dodano Twoją prace dyplomową do systemu.", emailMessage).GetAwaiter().GetResult();
        */
        return Done();
    }
}