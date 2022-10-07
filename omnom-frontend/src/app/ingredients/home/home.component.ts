import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../ingredient";
import {IngredientsService} from "../ingredients.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allIngredients: Ingredient[] = [];

  constructor(private ingredientsService: IngredientsService) {}

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.ingredientsService.get().subscribe(
      (data) => { this.allIngredients = data; }
    )
  }

}
