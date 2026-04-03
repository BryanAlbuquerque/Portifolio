var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("SitePolicy", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// SMTP
builder.Services.Configure<SmtpSettings>(
    builder.Configuration.GetSection("Smtp")
);

// Serviço de e-mail
builder.Services.AddScoped<EmailService>();

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI();


// CORS
app.UseCors("SitePolicy");

app.MapGet("/", () => "API ONLINE");

app.MapControllers();

app.Run();