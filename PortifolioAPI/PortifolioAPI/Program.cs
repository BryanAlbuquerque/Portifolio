var builder = WebApplication.CreateBuilder(args);

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

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// ATIVA O CORS
app.UseCors("SitePolicy");

app.MapControllers();

app.Run();
