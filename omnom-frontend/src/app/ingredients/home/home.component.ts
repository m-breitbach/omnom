import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../ingredient";
import {IngredientsService} from "../ingredients.service";
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  ingredients: Ingredient[] = [];

  constructor(public ingredientsService: IngredientsService, private readonly keycloak: KeycloakService) {}

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }

    this.get();
  }

  get() {
    this.ingredientsService.get().subscribe(
      (result: Ingredient[]) => { this.ingredients = result; }
    )
  }

  deleteByID(ingredientID: number) {
    this.ingredientsService.deleteByID(ingredientID).subscribe()
    this.ngOnInit()
  }
}
