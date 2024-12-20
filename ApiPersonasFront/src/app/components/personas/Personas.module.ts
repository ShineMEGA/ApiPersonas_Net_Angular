import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {PersonasRoutingModule } from './personas-routing.module';
import {PersonasComponent } from './personas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

/* LAS IMPORTACIONES MANEJAN MODULOS */
/* EN LA DECLARATIONS: MANEJAN componentes*/
@NgModule({
    imports: [
    CommonModule,
    PersonasRoutingModule,
    ButtonModule,
    FormsModule, // se usa para poder usar NgModel
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    ReactiveFormsModule
],
    declarations: [PersonasComponent]
})
export class PersonasModule { }
