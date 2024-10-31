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
  constructor(private _httpClient: HttpClient) { }
  
  obtenerPersonas() : Observable<Personas[]> {
    return this._httpClient.get<Personas[]>(this.ruta);
  }
  
  guardaPersonas(persona:Personas): Observable<any> {
    return this._httpClient.post<void>(this.ruta, persona);
  }

  actualizaPersona(persona: Personas): Observable<any> {
    return this._httpClient.put<void>(this.ruta + '/' + persona.personaId, persona);
  }
  
  eliminarPersona(id: number): Observable<{ message: string }> {
    return this._httpClient.delete<{ message: string }>(this.ruta + '/' + id);
  }
  
}
