import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Ingredient } from "./ingredient";

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Ingredient[]>('http://localhost:8080/ingredients')
  }
}
