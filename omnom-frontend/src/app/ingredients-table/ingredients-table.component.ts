import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss']
})
export class IngredientsTableComponent implements OnInit {

  table = this.fb.group({
    rows: this.fb.array([])
  });
  // control!: FormArray;
  // touchedRows = [];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // ngAfterViewInit() {
  //   this.control = this.table.get('rows') as FormArray;
  // }

  initiateForm(): FormGroup {
    return this.fb.group({
      ingredientID: ['adsf'],
      designation: ['asdf'],
      unit: ['asdf'],
      stable: [true],
      isEditable: [true]
    });
  }

  addRow() {
    this.rows.push(this.initiateForm());
  }

  deleteRow(index: number) {
    this.rows.removeAt(index);
  }

  // editRow(group: FormGroup) {
  //   // @ts-ignore
  //   group.get('isEditable').setValue(true);
  // }
  //
  // doneRow(group: FormGroup) {
  //   // @ts-ignore
  //   group.get('isEditable').setValue(false);
  // }

  saveUserDetails() {
    console.log(this.table.value);
  }

  get rows() {
    return this.table.controls['rows'] as FormArray;
  }

  // submitForm() {
  //   this.touchedRows = this.rows.controls.filter(row => row.touched).map(row => row.value);
  //   console.log(this.touchedRows);
  // }

}
