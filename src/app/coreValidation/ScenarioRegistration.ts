import { scenario, view, field } from './ScenarioItem';
import { ScenarioItem } from '../services/scenario.service';
import { ValidationWrapper } from './common/ValidationWrapper';
import { ValidatorsService } from './common/ValidatorsService';

export class ScenarioRegistration {
  register(scenarios: ScenarioItem[], validators: ValidatorsService): void {
    scenarios.push(this.createScenarioItem('app-sample-user', 'firstName', 'all', validators.getValidator('required')));
    scenarios.push(this.createScenarioItem('app-sample-user', 'stamp', 'lloyds', validators.getValidator('required'), validators.getValidator('minlength'), validators.getValidator('maxlengthTwenty')));
    scenarios.push(this.createScenarioItem('app-sample-user', 'lastName', 'company', validators.getValidator('required'), validators.getValidator('minlength'), validators.getValidator('maxlengthFifty')));
    scenarios.push(this.createScenarioItem('app-sample-user', 'companyLastName', 'company'));
    scenarios.push(this.createScenarioItem('app-sample-user', 'title', 'lloyds', validators.getValidator('minlength3'), validators.getValidator('required')));
    scenarios.push(this.createScenarioItem('view2', 'company', 'lloyds'));
    scenarios.push(this.createScenarioItem('app-sample-user', 'market', 'lloyds', validators.getValidator('required'), validators.getValidator('minlength')));
  }

  createScenarioItem(view: view, field: field, scenario: scenario | scenario[] = 'all', ...validators: ValidationWrapper[]): ScenarioItem {
    return {
      view: view, field: field, scenario: scenario, validators: validators
    };
  }
}
