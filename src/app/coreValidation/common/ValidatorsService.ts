import { ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidationWrapper } from './ValidationWrapper';
import { ValidationElements } from "./ValidationElements";
import { validationName } from '../ScenarioItem';
import { ValidationRegistration } from '../ValidationRegistration';



export class ValidatorsService {
  private ValidationElements: ValidationElements = new ValidationElements();
  private validationRegistration: ValidationRegistration = new ValidationRegistration();

  constructor() {
    this.validationRegistration.register(this.ValidationElements);
  }

  getValidator(type: validationName): ValidationWrapper {
    const validationItem = this.ValidationElements.validations.filter(v => v.validationType === type);
    return validationItem[0];
  }

  getValidators(items: ValidationWrapper[]): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    items.forEach((t: ValidationWrapper) => {
      validators.push(t.validation);
    });
    return validators;
  }


  getValidationError(validationElements: ValidationWrapper[], validationError: ValidationErrors, replacements: string[] = []): string {
    const validationItem = validationElements.filter(v => v.friendlyName === Object.keys(validationError)[0]);
    if (validationItem.length === 0) {
      return '';
    }
    let index = 0;
    return validationItem[0].message.replace(/\{\}/g, () => replacements[index++]);
  }
}
