import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personas } from '../models/persona.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  ruta=`${environment.rutaBackend}/Personas`; 
  constructor(private _httpClient: HttpClient) { } // se inyecta el servicio HttpClient
  
  obtenerPersonas() : Observable<Personas[]> { // se va obtener una lista de personas
    return this._httpClient.get<Personas[]>(this.ruta); // se hace una petición get al backend
  }
  
  guardaPersonas(persona:Personas): Observable<any> {
    return this._httpClient.post<void>(this.ruta, persona); // se hace una petición post al backend
  }

  actualizaPersona(persona: Personas): Observable<any> {
    return this._httpClient.put<void>(this.ruta + '/' + persona.personaId, persona); // se hace una petición put al backend
  }
  
  eliminarPersona(id: number): Observable<{ message: string }> { 
    return this._httpClient.delete<{ message: string }>(this.ruta + '/' + id); // message: string es el mensaje que se va a mostrar al eliminar
  }
  
}
