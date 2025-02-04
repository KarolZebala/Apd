using Adp.Domain.BuildingBlocks;
using System;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;

namespace Adp.Infrastructure.BuildingBlocks;

public class EmailSender : IEmailSender
{
    public async Task SendEmailAsync(string email, string subject, string message)
    {
        //to do move to appsettings.json 
        string fromEmail = "alysson.wintheiser@ethereal.email";
        string password = "cfZ5QJAFftpdM1YgUy";             
        
        MailMessage mail = new MailMessage();
        mail.From = new MailAddress(fromEmail);
        mail.To.Add(email);
        mail.Subject = subject;
        mail.Body = message;
        mail.IsBodyHtml = true;
            
        SmtpClient smtp = new SmtpClient("smtp.ethereal.email", 587);
        smtp.Credentials = new NetworkCredential(fromEmail, password);
        smtp.EnableSsl = true;

        // Send email
        // await smtp.SendMailAsync(mail);
    }
}