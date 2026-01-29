using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Portfolio.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public IndexModel(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [BindProperty]
        public string NomeAssunto { get; set; }

        [BindProperty]
        public string Email { get; set; }

        [BindProperty]
        public string Mensagem { get; set; }

        public void OnGet()
        {
        }

        public async Task<IActionResult> OnPostEnviarContatoAsync()
        {
            if (string.IsNullOrWhiteSpace(NomeAssunto) || string.IsNullOrWhiteSpace(Mensagem))
            {
                TempData["Erro"] = "Preencha todos os campos.";
                return Page();
            }

            var client = _httpClientFactory.CreateClient();

            var response = await client.PostAsJsonAsync(
                "http://localhost:5113/api/email/enviar", 
                new
                {
                    nomeAssunto = NomeAssunto,
                    email = Email,
                    mensagem = Mensagem
                });

            if (response.IsSuccessStatusCode)
            {
                TempData["Sucesso"] = "Mensagem enviada com sucesso!";
                return RedirectToPage();
            }

            TempData["Erro"] = "Erro ao enviar a mensagem. Tente novamente.";
            return Page();
        }
    }
}
