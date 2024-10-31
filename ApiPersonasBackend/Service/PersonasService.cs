using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore.Metadata;
using Repository;
using Service.interfaces;


namespace Service
{
    public class PersonasService : IService<Personas>
    {
        private readonly PersonasRepository _personasRepository;

        //constructor
        public PersonasService(PersonasRepository personasRepository) //al momento de que se inicailiza la clase necestamos algunos valores por defecto
        {
            _personasRepository = personasRepository;
        }

        public async Task<Personas> Create(Personas entity)
        {
            return await _personasRepository.Create(entity);
        }

        public async Task<Personas> Delete(int id)
        {
            return await _personasRepository.Delete(id);
        }

        public async Task<List<Personas>> GetAll()
        {
            return await _personasRepository.GetAll();
        }

        public async Task<Personas> GetById(int id)
        {
            return await _personasRepository.GetById(id);
        }

        public async Task<Personas> Update(Personas entity)
        {
            return await _personasRepository.Update(entity);
        }
    }
}
