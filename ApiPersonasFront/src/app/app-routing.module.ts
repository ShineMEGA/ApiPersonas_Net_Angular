import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './layout/notfound/notfound.component';
import { EscritorioComponent } from './components/escritorio/escritorio.component';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', component: EscritorioComponent }, // Llamar a un componente en lugar de loadChildren
            { path: 'components', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule) },
        ]
    },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
