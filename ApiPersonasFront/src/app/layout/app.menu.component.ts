import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Escritorio', icon: 'pi pi-fw pi-home', routerLink: ['/components/escritorio'] },
                ]
            },
            {
                label: 'Modulos',
                items: [
                    { label: 'Personas', icon: 'pi pi-fw pi-users', routerLink: ['/components/personas'] },
                ]
            },
        ];
    }
}
