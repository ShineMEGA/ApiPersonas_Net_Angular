import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';




@NgModule({ //neecsario agregar el RouterModule para que funcione 
  imports: [ RouterModule.forChild([
    {path: 'escritorio', loadChildren: () => import('./escritorio/escritorio.module').then(m => m.EscritorioModule) },
     {path: 'personas', loadChildren: () => import('./personas/personas.module').then(m => m.PersonasModule) },
  ])]
})
export class ComponentsRoutingModule { }
