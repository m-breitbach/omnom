import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { HomeComponent } from './home/home.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        IngredientsRoutingModule,
        FormsModule,
    ]
})
export class IngredientsModule { }
