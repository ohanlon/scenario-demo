import { Injectable } from '@angular/core';
import { ScenarioItem, visibility, view, field } from './ScenarioItem';
import { FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidationWrapper } from './ValidationWrapper';
import { ValidatorsService } from "./ValidatorsService";

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  private scenarios: ScenarioItem[] = [];
  private validators: ValidatorsService = new ValidatorsService();
  constructor() { 
    this.init();
  }
  
  public getScenarios(view: view, visibility: visibility| visibility[]): ScenarioItem[] {
    return this.scenarios.filter(s => s.view === view && s.visibility === visibility || s.visibility === 'all' );
  }

  setValidators(form: FormGroup, view: view, visibility: visibility | visibility[]): void {
    this.getScenarios(view, visibility).forEach(s => {
      const field = form.controls[s.field];
      const validators = this.validators.getValidators(s.validators);
      field.setValidators(validators);
      field.updateValueAndValidity();
    });
  }

  showInForm(view: view, visibility: visibility | visibility[], field: field): boolean {
    return this.scenarios.filter(s => s.view === view && (s.visibility === visibility || s.visibility === 'all') && s.field === field).length > 0;
  }

  triggerValidation(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control!.markAsTouched({ onlySelf: true });
    });
  }

  getValidationMessage(view: view, field: field, visibility: visibility, validationError: ValidationErrors, replacements: string[] = []): string {
    const scenario = this.scenarios.filter(s => s.view === view && (s.visibility === visibility || s.visibility === 'all') && s.field === field);
    return this.validators.getValidationError(scenario[0].validators, validationError, replacements);
  }

  private init() {
    this.scenarios.push(this.createScenarioItem('sample-user', 'firstName', [ this.validators.getValidator('required') ], 'all'));
    this.scenarios.push(this.createScenarioItem('sample-user', 'lloydsLastName', [ this.validators.getValidator('required'), this.validators.getValidator('minlength'), this.validators.getValidator('maxlengthTwenty')], 'lloyds'));
    this.scenarios.push(this.createScenarioItem('sample-user', 'lloydsLastName', [ this.validators.getValidator('required'), this.validators.getValidator('minlength'), this.validators.getValidator('maxlengthFifty')], 'company'));
    this.scenarios.push(this.createScenarioItem('sample-user', 'companyLastName', [], 'lloyds'));
  }

  private createScenarioItem(view: view, field: field, validators: ValidationWrapper[], visibility: visibility | visibility[] = 'all'): ScenarioItem {
    return {
      view: view, field: field, visibility: visibility, validators: validators };
  }
}


