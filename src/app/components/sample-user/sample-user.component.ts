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
    firstName: new FormControl(null),
    lloydsLastName: new FormControl(null),
    companyLastName: new FormControl(null)
  });
  constructor(private scenarioService: ScenarioService) { }

  ngOnInit(): void {
    this.scenarioService.setValidators(this.sampleForm, 'sample-user', 'lloyds');
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.sampleForm.valid) {
      console.log('form submitted');
      this.sampleForm.reset();
    } else {
      this.scenarioService.triggerValidation(this.sampleForm);
    }
  }

  isVisible(field: field): boolean {
    return this.scenarioService.showInForm('sample-user', 'lloyds', field);
  }

  submitted: boolean = false;

  get controls() { return this.sampleForm.controls; }

  errors(field: field, ...replacements: string[]): string {
    const errors = this.sampleForm.get(field)?.errors;
    if (!errors) return '';
    return this.scenarioService.getValidationMessage('sample-user', 'lloydsLastName', 'lloyds', errors, replacements);
  }

}
