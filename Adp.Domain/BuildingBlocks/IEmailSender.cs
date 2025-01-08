namespace Adp.Domain.BuildingBlocks;

public interface IEmailSender
{
    Task SendEmailAsync(string email, string subject, string message);
}