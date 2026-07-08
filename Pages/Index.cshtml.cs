using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Portfolio.Pages
{
    public class IndexModel : PageModel
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;

        public IndexModel(
            IHttpClientFactory httpClientFactory,
            IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        [BindProperty]
        public string NomeAssunto { get; set; }

        [BindProperty]
        public string Email { get; set; }

        [BindProperty]
        public string Mensagem { get; set; }

        public void OnGet() { }

        public async Task<IActionResult> OnPostEnviarContatoAsync()
        {
            if (string.IsNullOrWhiteSpace(NomeAssunto) ||
                string.IsNullOrWhiteSpace(Email) ||
                string.IsNullOrWhiteSpace(Mensagem))
            {
                TempData["Erro"] = "Preencha todos os campos.";
                return Page();
            }

            try
            {
                var client = _httpClientFactory.CreateClient();

                var baseUrl = _configuration["ApiSettings:BaseUrl"]?.TrimEnd('/');

                var url = $"{baseUrl}/api/email/enviar";

                var response = await client.PostAsJsonAsync(
                    url,
                    new
                    {
                        nomeAssunto = NomeAssunto,
                        email = Email,
                        mensagem = Mensagem
                    });

                var content = await response.Content.ReadAsStringAsync();

                if (response.IsSuccessStatusCode)
                {
                    TempData["Sucesso"] = "Mensagem enviada com sucesso!";
                    return RedirectToPage();
                }

                TempData["Erro"] = $"Erro API: {response.StatusCode} - {content}";
                return Page();
            }
            catch (Exception ex)
            {
                TempData["Erro"] = $"Erro de conexão: {ex.Message}";
                return Page();
            }
        }
    }
}