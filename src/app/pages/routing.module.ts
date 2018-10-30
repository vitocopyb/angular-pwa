import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { GaleriaComponent } from './galeria/galeria.component';

const app_routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'home', component: HomeComponent },
    { path: 'galeria', component: GaleriaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
    imports: [
        RouterModule.forRoot( app_routes, { useHash: true } )
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule { }

