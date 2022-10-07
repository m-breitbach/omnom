import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
  ]
})
export class IngredientsModule { }
