import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EscritorioRoutingModule } from './escritorio-routing.module';
import { EscritorioComponent } from './escritorio.component';

/* LAS IMPORTACIONES MANEJAN MODULOS */
/* EN LA DECLARATIONS: MANEJAN componentes*/
@NgModule({
    imports: [
    CommonModule,
    EscritorioRoutingModule,
],
    declarations: [EscritorioComponent]
})
export class EscritorioModule { }
