using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/email")]
public class EmailController : ControllerBase
{
    private readonly EmailService _emailService;

    public EmailController(EmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("enviar")]
    public async Task<IActionResult> Enviar([FromBody] EmailRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _emailService.EnviarEmailAsync(request);

        return Ok(new { mensagem = "E-mail enviado com sucesso!" });
    }
}
