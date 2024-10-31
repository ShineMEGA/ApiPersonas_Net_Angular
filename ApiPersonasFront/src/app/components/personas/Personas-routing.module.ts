import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonasComponent } from './Personas.component';




@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PersonasComponent }
    ])],
    exports: [RouterModule]
})
export class PersonasRoutingModule { 
   
}
