import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ingredient} from "./ingredient";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  constructor(
    private http: HttpClient
  ) { }

  get() {
    return this.http.get<Ingredient[]>(environment.backendURL + '/ingredients')
  }
}
