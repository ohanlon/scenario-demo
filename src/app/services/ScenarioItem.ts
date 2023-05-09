import { ValidationWrapper } from './ValidationWrapper';


export interface ScenarioItem {
  view: view;
  field: field;
  visibility: visibility | visibility[];
  validators: ValidationWrapper[];
}

export type visibility = 'company' | 'lloyds' | 'all';

export type view = 'sample-user' | 'view2' | 'view3';

export type field = 'firstName' | 'lloydsLastName' | 'companyLastName';

export type validationNames = 'required' | 'maxlengthTwenty' | 'maxlengthFifty' | 'minlength';

export type friendlyName = 'minlength' | 'maxlength' | 'required';

