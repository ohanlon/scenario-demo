import { ValidationWrapper } from './ValidationWrapper';


export interface ScenarioItem {
  view: view;
  field: field;
  visibility: visibility | visibility[];
  validators: ValidationWrapper[];
}

export type visibility = 'company' | 'lloyds' | 'all';

export type view = 'view1' | 'view2' | 'view3';

export type field = 'field1' | 'field2' | 'field3';

export type validationNames = 'required' | 'maxlengthTwenty' | 'maxlengthFifty' | 'minlength';

export type friendlyName = 'minlength' | 'maxlength' | 'required';

