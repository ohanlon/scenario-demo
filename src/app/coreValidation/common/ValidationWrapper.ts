import { ValidatorFn } from '@angular/forms';
import { validationName } from '../ScenarioItem';

export class ValidationWrapper {
  private validator: ValidatorFn;
  private errorMessage: string;
  private type: string;
  private name: string;
  constructor(type: validationName, validator: ValidatorFn, errorMessage: string, name: string) {
    this.validator = validator;
    this.errorMessage = errorMessage;
    this.type = type;
    this.name= name;
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

  get friendlyName(): string {
    return this.name;
  }
}
