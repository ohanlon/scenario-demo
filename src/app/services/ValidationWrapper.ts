import { ValidatorFn } from '@angular/forms';
import { validationNames } from './ScenarioItem';


export class ValidationWrapper {
  private validator: ValidatorFn;
  private errorMessage: string;
  private type: string;
  private friendlyName: string;
  constructor(type: validationNames, validator: ValidatorFn, errorMessage: string, friendlyName: string) {
    this.validator = validator;
    this.errorMessage = errorMessage;
    this.type = type;
    this.friendlyName= friendlyName;
  }

  get validation(): ValidatorFn {
    return this.validator;
  }

  get message(): string {
    return this.errorMessage;
  }

  get validationType(): string {
    return this.type;
  }

  get name(): string {
    return this.friendlyName;
  }
}
