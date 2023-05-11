import { Injectable } from '@angular/core';
import { scenario, view, field } from '../coreValidation/ScenarioItem';
import { FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ScenarioRegistration } from '../coreValidation/ScenarioRegistration';
import { ValidationWrapper } from '../coreValidation/common/ValidationWrapper';
import { ValidatorsService } from '../coreValidation/common/ValidatorsService';

export interface ScenarioItem {
  view: view;
  field: field;
  scenario: scenario | scenario[];
  validators: ValidationWrapper[];
}

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  private scenarios: ScenarioItem[] = [];
  private validators: ValidatorsService = new ValidatorsService();
  private ScenarioRegistration: ScenarioRegistration = new ScenarioRegistration();
  constructor() { 
    this.ScenarioRegistration.register(this.scenarios, this.validators);
  }
  
  public getScenarios(view: view, scenario: scenario| scenario[]): ScenarioItem[] {
    return this.scenarios.filter(s => s.view === view && s.scenario === scenario || s.scenario === 'all' );
  }

  setValidators(form: FormGroup, view: view, scenario: scenario | scenario[]): void {
    this.getScenarios(view, scenario).forEach(s => {
      const field = form.controls[s.field];
      const validators = this.validators.getValidators(s.validators);
      field.setValidators(validators);
      field.updateValueAndValidity();
    });
  }

  showInForm(view: view, scenario: scenario | scenario[], field: field): boolean {
    return this.scenarios.filter(s => s.view === view && (s.scenario === scenario || s.scenario === 'all') && s.field === field).length > 0;
  }

  triggerValidation(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control!.markAsTouched({ onlySelf: true });
    });
  }

  getValidationMessage(view: view, field: field, scenario: scenario, validationError: ValidationErrors, replacements: string[]): string {
    const filter = this.scenarios.filter(s => s.view === view && (s.scenario === scenario || s.scenario === 'all') && s.field === field);
    return this.validators.getValidationError(filter[0].validators, validationError, replacements);
  }
}