import { Validators } from '@angular/forms';
import { ValidationElements } from "./common/ValidationElements";

export class ValidationRegistration {
  register(validationElements: ValidationElements): void {
    validationElements.addValidation('required', Validators.required, '{} is required', 'required');
    validationElements.addValidation('minlength3', Validators.minLength(3), '{} must be 3 characters or more', 'minlength');
    validationElements.addValidation('minlength', Validators.minLength(10), '{} must be at least 10 characters', 'minlength');
    validationElements.addValidation('maxlengthTwenty', Validators.maxLength(20), '{} must be at most 20 characters', 'maxlength');
    validationElements.addValidation('maxlengthFifty', Validators.maxLength(50), '{} must be at most 50 characters', 'maxlength');
  }
}
