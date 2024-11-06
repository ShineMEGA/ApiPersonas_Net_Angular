import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonasComponent } from './personas.component';




@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PersonasComponent }
    ])],
    exports: [RouterModule]
})
export class PersonasRoutingModule { 
   
}
