import {Component} from "@angular/core"
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {IngredientsService} from "../ingredients.service"
import {Router} from "@angular/router"

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent {
  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ingredientService: IngredientsService,
  ) {
    this.form = this.fb.group({
      designation: ["", Validators.required],
      unit: ["GRAMS", Validators.required],
      stable: [false, Validators.required],
    })
  }

  submit() {
    this.ingredientService.add(this.form.value).subscribe(() => this.router.navigate(["/ingredients/home"]))
  }
}
