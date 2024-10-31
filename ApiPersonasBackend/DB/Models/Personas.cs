using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Models
{
    public class Personas : IValidatableObject // es una interfaz
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // para ponerlo auto incrementable al PersonaId
        public int PersonaId { get; set; }
        //[StringLength(50, MinimumLength = 5, ErrorMessage = "El nombre debe tener entre 5 y 50 caracteres.")]
        public string Nombre { get; set; }
        [Range(10, 100, ErrorMessage = "La edad debe estar entre 10 y 100 años.")]
        public int Edad { get; set; }
        [EmailAddress(ErrorMessage = "El correo electrónico no es válido.")]
        public string email { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Nombre.Length < 2 || Nombre.Length > 50)
            {
                yield return new ValidationResult("El nombre debe tener entre 5 y 50 caracteres.", new[] {"Nombre"});
            }
        }
    }
}
