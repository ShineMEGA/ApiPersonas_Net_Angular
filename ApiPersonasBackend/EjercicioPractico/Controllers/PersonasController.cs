using DB;
using DB.Models;
using Microsoft.AspNetCore.Mvc;
using Service;
using System.Reflection.Metadata.Ecma335;


namespace ApiPersonas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonasController : ControllerBase
    {
        private readonly PersonasService _personasService; // se agrega una referencia service para llamar a la capa de servicio

        //constructor, necesario inyectar dependencias
        public PersonasController(ApiPersonasContext context, PersonasService personasService) //al momento de que se inicailiza la clase necestamos algunos valores por defecto
        {
            _personasService = personasService; // necesario agregar la instancia del objeto
        }

        // GET: api/<PersonasController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Personas>>> Get() // devolvera una lista del tipo Personas, llamando al servivio de personas
        {
            return Ok(await _personasService.GetAll());

        }

        // GET api/<PersonasController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Personas>> GetById(int id)
        {
            return Ok(await _personasService.GetById(id));            
        }

        // POST api/<PersonasController>
        [HttpPost]
        public async Task<IActionResult> Post(Personas personas) // agregar un IActionResult para devolver la respuesta http pueda devlver algun error o un status OK
        {
            return Ok( await _personasService.Create(personas) );
        }

        // PUT api/<PersonasController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Personas personas)
        {
            return Ok(await _personasService.Update(personas));
        }

        // DELETE api/<PersonasController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _personasService.Delete(id);
            return Ok("{\"message\": \"Deleted\"}");
        }
    }
}
