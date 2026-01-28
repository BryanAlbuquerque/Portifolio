using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;

public class EmailService
{
    private readonly SmtpSettings _settings;

    public EmailService(IOptions<SmtpSettings> settings)
    {
        _settings = settings.Value;
    }

    public async Task EnviarEmailAsync(EmailRequest req)
    {
        var client = new SmtpClient(_settings.Host, _settings.Port)
        {
            EnableSsl = _settings.UseSsl,
            Credentials = new NetworkCredential(
                _settings.User,
                _settings.Password
            )
        };

        string corpoEmail = $@"
            <h3>Contato recebido pelo site</h3>
            <p><strong>Nome / Assunto:</strong> {req.NomeAssunto}</p>
            <hr />
            <p><strong>E-mail:</strong> {req.Email}</p>
            <p><strong>Mensagem:</strong></p>
            <p>{req.Mensagem}</p>
        ";

        var mail = new MailMessage
        {
            From = new MailAddress(
                _settings.User,
                "Formulário do Site"
            ),
            To = { "bryanalburquerque2@gmail.com" },
            Subject = req.NomeAssunto,
            Body = corpoEmail,
            IsBodyHtml = true
        };

        await client.SendMailAsync(mail);
    }
}
