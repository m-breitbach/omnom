import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IngredientsModule} from "./ingredients/ingredients.module";
import {HomeComponent} from "./ingredients/home/home.component";
import {AddComponent} from "./ingredients/add/add.component";

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
    path: 'ingredients/add',
    component: AddComponent,
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
