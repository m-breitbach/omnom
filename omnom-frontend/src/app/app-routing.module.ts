import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IngredientsModule} from "./ingredients/ingredients.module";
import {HomeComponent} from "./ingredients/home/home.component";
import {IngredientsTableComponent} from "./ingredients-table/ingredients-table.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingredients/home',
    pathMatch: 'full',
  },
  {
    path: 'ingredients/home',
    component: HomeComponent,
  },
  {
    path: 'ingredients-table',
    component: IngredientsTableComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    IngredientsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
