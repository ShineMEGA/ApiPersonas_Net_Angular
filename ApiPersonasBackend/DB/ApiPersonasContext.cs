using DB.Models;
using Microsoft.EntityFrameworkCore;

namespace DB
{
    public class ApiPersonasContext : DbContext
    {
        public ApiPersonasContext(DbContextOptions<ApiPersonasContext> options)
            : base(options) { } // configuracion para inicializar el contexto

        // se debe enlazar a cada modelo con el contexto con un dbSet
        public DbSet<Personas> Personas { get; set; }

    }
}
