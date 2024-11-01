using DB;
using DB.Models;
using Microsoft.EntityFrameworkCore.Metadata;
using Repository;
using Service.interfaces;
using System.Text.RegularExpressions;


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
            // Validaciones
            if (string.IsNullOrWhiteSpace(entity.Nombre) || entity.Nombre.Length > 50)
            {
                throw new ArgumentException("El nombre debe tener entre 1 y 50 caracteres.");
            }

            if (entity.Edad < 10 || entity.Edad > 100)
            {
                throw new ArgumentException("La edad debe estar entre 10 y 100 años.");
            }
            // @" es una forma de declarar una cadena de texto literal
            // $ indica el final de la cadena. Asegura que no haya caracteres adicionales
            var emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$"; 
            if (!Regex.IsMatch(entity.Email, emailPattern))
            {
                throw new ArgumentException("El correo electrónico no es válido.");
            }

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
            if (string.IsNullOrWhiteSpace(entity.Nombre) || entity.Nombre.Length > 50)
            {
                throw new ArgumentException("El nombre debe tener entre 1 y 50 caracteres.");
            }

            if (entity.Edad < 10 || entity.Edad > 100)
            {
                throw new ArgumentException("La edad debe estar entre 10 y 100 años.");
            }

            var emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            if (!Regex.IsMatch(entity.Email, emailPattern))
            {
                throw new ArgumentException("El correo electrónico no es válido.");
            }
            return await _personasRepository.Update(entity);
        }
    }
}
