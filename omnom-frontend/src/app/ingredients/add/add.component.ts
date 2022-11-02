import {Component, OnInit} from "@angular/core"
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {IngredientsService} from "../ingredients.service"
import {Router} from "@angular/router"

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.scss"],
})
export class AddComponent implements OnInit {
  form: FormGroup

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public ingredientService: IngredientsService,
  ) {
    this.form = this.fb.group({
      designation: ["", Validators.required],
      unit: ["GRAMS", Validators.required],
      stable: [false],
    })
  }

  ngOnInit(): void { }

  submit() {
    this.ingredientService.add(this.form.value).subscribe(() => this.router.navigateByUrl("/ingredients/home"))
  }

}
