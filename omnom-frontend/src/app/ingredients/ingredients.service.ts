import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ingredient} from "./ingredient";
import {environment} from "../../environments/environment";
import {APP_BASE_HREF} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  constructor(
    private http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref: string
  ) { }

  get() {
    return this.http.get<Ingredient[]>(environment.backendURL + this.baseHref + '/ingredients')
  }
}
