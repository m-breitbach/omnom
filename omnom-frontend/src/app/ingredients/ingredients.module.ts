import {NgModule} from "@angular/core"
import {CommonModule} from "@angular/common"

import {IngredientsRoutingModule} from "./ingredients-routing.module"
import {HomeComponent} from "./home/home.component"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {AddComponent} from "./add/add.component"
import {EditComponent} from "./edit/edit.component"


@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    IngredientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class IngredientsModule {}
