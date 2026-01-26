using System.ComponentModel.DataAnnotations;

public class EmailRequest
{
    [Required]
    public string NomeAssunto { get; set; }

    [Required]
    public string Mensagem { get; set; }
}
