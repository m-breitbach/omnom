import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsModule } from "./ingredients/ingredients.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingredients/home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    IngredientsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
