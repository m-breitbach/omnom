import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ingredient} from "./ingredient";
import {environment} from "../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class IngredientsService {

  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  constructor(private http: HttpClient) { }

  get(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${environment.backendURL}/ingredients`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getByID(ingredientID: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${environment.backendURL}/ingredients/${ingredientID}`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  add(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(`${environment.backendURL}/ingredients`, JSON.stringify(ingredient), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  edit(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${environment.backendURL}/ingredients/${ingredient.ingredientID}`, JSON.stringify(ingredient), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  deleteByID(ingredientID: number): Observable<Ingredient>{
    return this.http.delete<Ingredient>(`${environment.backendURL}/ingredients/${ingredientID}`)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }
}
