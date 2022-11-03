import {Component, OnInit} from "@angular/core"
import {Ingredient} from "../ingredient"
import {IngredientsService} from "../ingredients.service"
import {KeycloakProfile} from "keycloak-js"
import {KeycloakService} from "keycloak-angular"
import {NavigationEnd, Router} from "@angular/router"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isLoggedIn = false
  userProfile: KeycloakProfile | null = null

  ingredients: Ingredient[] = []

  constructor(
    private readonly keycloak: KeycloakService,
    private ingredientsService: IngredientsService,
  ) {}

  async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn()

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile()
    }

    this.load()
  }

  deleteByID(ingredientID: number) {
    this.ingredientsService.deleteByID(ingredientID).subscribe()
    this.refresh()
  }

  private load() {
    this.ingredientsService.get().subscribe(
      (result: Ingredient[]) => { this.ingredients = result },
    )
  }

  private refresh() {
    this.ngOnInit().then() // TODO: fix
  }
}
