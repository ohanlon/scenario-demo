import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ScenarioService } from 'src/app/services/scenario.service';
import { field, view, visibility } from 'src/app/services/ScenarioItem';

@Component({
  selector: 'app-sample-user',
  templateUrl: './sample-user.component.html',
  styleUrls: ['./sample-user.component.scss']
})
export class SampleUserComponent implements OnInit {

  sampleForm = new FormGroup({
    field1: new FormControl(null),
    field2: new FormControl(null),
    field3: new FormControl(null)
  });
  constructor(private scenarioService: ScenarioService) { }

  ngOnInit(): void {
    this.scenarioService.setValidators(this.sampleForm, 'view1', 'lloyds');
  }

  callingFunction(): void {
    this.submitted = true;
    if (this.sampleForm.valid) {
      console.log('form submitted');
    } else {
      this.scenarioService.triggerValidation(this.sampleForm);
    }
  }

  isVisible(field: field): boolean {
    return this.scenarioService.showInForm('view1', 'lloyds', field);
  }

  submitted: boolean = false;

  get f() { return this.sampleForm.controls; }

  errors(field: field): string {
    const errors = this.sampleForm.get(field)?.errors;
    if (!errors) return '';
    return this.scenarioService.getValidationMessage('view1', 'field2', 'lloyds', errors);
  }

}
