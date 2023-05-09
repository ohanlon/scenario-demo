import { ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidationWrapper } from './ValidationWrapper';
import { ValidationElements } from "./ValidationElements";
import { validationNames } from './ScenarioItem';


export class ValidatorsService {
  private ValidationElements: ValidationElements = new ValidationElements();

  constructor() {
    this.init();
  }

  getValidator(type: validationNames): ValidationWrapper {
    const validationItem = this.ValidationElements.validations.filter(v => v.validationType === type);
    return validationItem[0];
  }

  getValidators(items: ValidationWrapper[]): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    items.forEach(t => {
      validators.push(t.validation);
    });
    return validators;
  }


  getValidationError(validationElements: ValidationWrapper[], validationError: ValidationErrors, replacements: string[] = []): string {
    const validationItem = validationElements.filter(v => v.name === Object.keys(validationError)[0]);
    if (validationItem.length === 0) {
      return '';
    }
    let index = 0;
    return validationItem[0].message.replace(/\{\}/g, () => replacements[index++]);
  }

  private init(): void {
    this.ValidationElements.addValidation('required', Validators.required, '{} is required', 'required');
    this.ValidationElements.addValidation('minlength', Validators.minLength(10), '{} must be at least 10 characters', 'minlength');
    this.ValidationElements.addValidation('maxlengthTwenty', Validators.maxLength(20), '{} must be at most 20 characters', 'maxlength');
    this.ValidationElements.addValidation('maxlengthFifty', Validators.maxLength(50), '{} must be at most 50 characters', 'maxlength');
  }
}
