import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EscritorioComponent } from './Escritorio.component';




@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EscritorioComponent }
    ])],
    exports: [RouterModule]
})
export class EscritorioRoutingModule { 
   
}