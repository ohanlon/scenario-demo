import { ValidatorFn } from '@angular/forms';
import { ValidationWrapper } from './ValidationWrapper';
import { friendlyName, validationName } from '../ScenarioItem';

export class ValidationElements {
  private elements: ValidationWrapper[] = [];
  constructor() { }

  addValidation(type: validationName, validator: ValidatorFn, errorMessage: string, friendlyName: friendlyName): void {
    this.elements.push(new ValidationWrapper(type, validator, errorMessage, friendlyName));
  }

  get validations(): ValidationWrapper[] {
    return this.elements;
  }
}
