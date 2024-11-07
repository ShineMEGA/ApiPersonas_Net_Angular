import { Component, OnInit } from '@angular/core';
import { PieControllerDatasetOptions } from 'chart.js';
import { Personas } from 'src/app/models/persona.model';
import { PersonasService } from 'src/app/service/personas.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-persona',
  templateUrl: './personas.component.html',
  providers:[MessageService]
})
/* se debe implentar el momento en donde se va cargar la inf en este caso es el onInit
*  podria dar error en PersonasComponent pero solo es implementar la clase ' ngOnInit(): void {'
*/
export class PersonasComponent implements OnInit { 
  titulo="Personas";
  persona = new Personas();
  personas: Personas[]=[];

  cols: any[] = [];
  personasDialog: boolean = false;
  eliminarPersonaDialog: boolean = false;

  personaForm: FormGroup = new FormGroup({});

  constructor(
    private _personasService: PersonasService, // se inyecta el servicio PersonasService para poder usarlo 
    private _messageService: MessageService,
    private  fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.fpersonas();
    this.personaForm = this.fb.group({
      personaId: [''],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      email : ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(10), Validators.max(100)]]
    });
  }
  
  fpersonas(){
    this._personasService.obtenerPersonas().subscribe(dato =>{ // se suscribe al servicio para obtener la lista de personas
      this.personas = dato;
    })
  }

  savePersona() { 
    if (this.personaForm.valid) {
      if (this.persona.personaId) {  // Editar
        this._personasService.actualizaPersona(this.personaForm.value).subscribe(dato => {
          this.persona = dato;
          this.personas[this.findIndexById(this.persona.personaId)] = this.persona;
          this.personas = [...this.personas]; // Recarga el arreglo después de actualizar
          this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Persona Actualizada', life: 3000 });
          this.hideDialog(); // Cierra el diálogo después de que se actualice el arreglo
        }, error => {
          const ErrorMessage = error.error.split('\r\n')[0];
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar persona:\n' + ErrorMessage, life: 5000 });
        });
      } else { // Nuevo
        delete this.personaForm.value.personaId; // Elimina personaId antes de enviar
        this._personasService.guardaPersonas(this.personaForm.value).subscribe(dato => {
          this.persona = dato;
          this.personas.push(this.persona);
          this.personas = [...this.personas]; // Recarga el arreglo después de agregar
          this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Persona agregada', life: 3000 });
          this.hideDialog(); // Cierra el diálogo después de que se actualice el arreglo
        }, error => {
          const ErrorMessage = error.error.split('\r\n')[0];
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar persona:\n' + ErrorMessage, life: 5000 });
        });
      }
    }
  }
  
  
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.personas.length; i++) {
        if (this.personas[i].personaId === id) {
            index = i;
            break;
        }
    }
    return index;
}

  cleanObjectPerson() {
    this.persona = new Personas();  // Restablecer el objeto persona a su estado inicial
  }

  abrirDialog() {
    this.personaForm.reset();
    this.cleanObjectPerson();
    this.personasDialog = true;
  }

  hideDialog() {
    this.cleanObjectPerson();
    this.personasDialog = false;
  }

  deletePersona(personaDel: Personas) {
    this.persona = {...personaDel};
    this.eliminarPersonaDialog = true;
  }

  editPersona(personaUp: Personas) {
    this.persona = { ...personaUp };
    this.personaForm.patchValue(this.persona);
    this.personasDialog = true
  }

  confirmDelete(){
    this.eliminarPersonaDialog = false;
    this._personasService.eliminarPersona(this.persona.personaId).subscribe(response => {
      if (response.message === "Deleted") {
        // Elimina el persona de la lista local
        this.personas = this.personas.filter(persona => persona.personaId !== this.persona.personaId);      
        this._messageService.add({ severity: 'success', summary: 'Exito!', detail: 'Persona Borrada', life: 3000 });
      }
    }, error => {
      console.error("Error eliminando persona:", error);
    });
  }
}