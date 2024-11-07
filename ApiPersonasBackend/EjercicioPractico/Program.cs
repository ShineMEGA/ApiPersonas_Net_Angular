using DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Writers;
using Microsoft.Win32;
using Repository;
using Repository.interfaces;
using Service;

var builder = WebApplication.CreateBuilder(args);
// Configurar servicios de CORS  los cors se habilitan
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") // Orígenes permitidos quitar la '/' final para evitar error
            .AllowAnyMethod() // Métodos permitidos
            .AllowAnyHeader(); // Encabezados permitidos
        });
});


// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Repositorio
builder.Services.AddScoped<PersonasRepository>();
//Servicio
//Registra la clase PersonasService en el contenedor de dependencias con un ciclo de vida Scoped.
builder.Services.AddScoped<PersonasService>();

// Agregar una nueva regla para añadir el CONTEXTO  de la base de datos a laa aplicacion
builder.Services.AddDbContext<ApiPersonasContext>(options => 
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ApiPersonasConnection"));
});


var app = builder.Build();
//para poder utilziar el contexto y realizar migraciones 
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApiPersonasContext>();
    context.Database.Migrate();
}


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
