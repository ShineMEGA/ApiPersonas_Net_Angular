import { Component, OnInit } from '@angular/core';
import { PieControllerDatasetOptions } from 'chart.js';
import { Personas } from 'src/app/models/persona.model';
import { PersonasService } from 'src/app/service/personas.service';
import { MessageService } from 'primeng/api';

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

  constructor(
    private _personasService: PersonasService,
    private _messageService: MessageService,
  ) {}
  
  ngOnInit(): void {
    this.fpersonas();
  }
  
  fpersonas(){
    this._personasService.obtenerPersonas().subscribe(dato =>{
      this.personas = dato;
    })
  }

  savePersona(){ 
    //Editar
    if (this.persona.personaId) { 
      this._personasService.actualizaPersona(this.persona).subscribe( dato => {
        this.persona = dato;
        this.personas[this.findIndexById(this.persona.personaId)] = this.persona;
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Persona Actualizada', life: 3000 });
      })
      
    } else { // Nuevo
      console.log(this.persona);
      this._personasService.guardaPersonas(this.persona).subscribe(dato => {
        this.persona= dato;
        this.personas.push(this.persona);
        this._messageService.add({ severity: 'success', summary: 'Correcto', detail: 'Persona agregada', life: 3000 });
      })
    }
    this.personas = [...this.personas]; // Recarga el arreglo
    this.hideDialog();
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