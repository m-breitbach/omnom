import {Component, OnDestroy, OnInit} from "@angular/core"
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {IngredientsService} from "../ingredients.service"
import {ActivatedRoute, Params, Router} from "@angular/router"
import {Ingredient} from "../ingredient"
import {Subscription} from "rxjs"

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit, OnDestroy {
  public form: FormGroup
  private paramsub!: Subscription

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ingredientsService: IngredientsService,
  ) {
    this.form = this.fb.group({
      ingredientID: [{value: undefined, disabled: true}, Validators.required],
      designation: [undefined, Validators.required],
      unit: [undefined, Validators.required],
      stable: [undefined, Validators.required],
    })
  }

  ngOnInit(): void {
    this.paramsub = this.route.params.subscribe((params: Params) => {
      this.ingredientsService.getByID(+params["ingredientID"]).subscribe((result: Ingredient) => {
        this.form.setValue({
          ingredientID: result.ingredientID,
          designation: result.designation,
          unit: result.unit,
          stable: result.stable,
        })
      })
    })
  }

  ngOnDestroy() {
    this.paramsub.unsubscribe()
  }

  submit() {
    this.ingredientsService.edit(this.form.getRawValue()).subscribe(() => this.router.navigateByUrl("/ingredients/home"))
  }

}
