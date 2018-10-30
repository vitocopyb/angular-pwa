import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { GaleriaComponent } from './galeria/galeria.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        AboutComponent,
        HomeComponent,
        GaleriaComponent
    ]
})
export class PagesModule {}
