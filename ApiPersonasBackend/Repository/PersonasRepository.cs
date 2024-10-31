using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore;
using Repository.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    //capa de acceso a datos
    public class PersonasRepository : IRepository<Personas> // implementar los metodos de la interfaz.
    {
        private readonly ApiPersonasContext _context; //crear el atributo del tipo ApiPersonasContext llamandolo _context
        public PersonasRepository(ApiPersonasContext context) //al momento de que se inicailiza la clase necestamos algunos valores por defecto
        {
            _context = context;
        }

        public async Task<Personas> Create(Personas entity)
        {
            _context.Personas.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Personas> Delete(int id)
        {
            var entity = await _context.Personas.FindAsync(id);
            if (entity != null) {
                _context.Personas.Remove(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            return null;
        }

        public async Task<List<Personas>> GetAll()
        {
            return await _context.Personas.ToListAsync();
        }

        public async Task<Personas> GetById(int id)
        {
            return await _context.Personas.FindAsync(id);
        }

        public async Task<Personas> Update(Personas entity)
        {
            _context.Entry(entity).State = EntityState.Modified; //Inyectando el valor de personas para poder reemplazarlo
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
