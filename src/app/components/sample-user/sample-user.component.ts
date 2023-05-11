import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidatingComponent } from 'src/app/coreValidation/common/ValidatingComponent';
import { ScenarioService } from 'src/app/services/scenario.service';

@Component({
  selector: 'app-sample-user',
  templateUrl: './sample-user.component.html',
  styleUrls: ['./sample-user.component.scss']
})
export class SampleUserComponent extends ValidatingComponent {

  sampleForm = new FormGroup({
    firstName: new FormControl(null),
    lastName: new FormControl(null), // Only visible for company
    title: new FormControl(null),
    stamp: new FormControl(null), // Only visible for lloyds
  });

  constructor(scenarioService: ScenarioService) { 
    super(scenarioService);
    this.preInit(this.sampleForm, 'app-sample-user', 'lloyds');
  }

  doSubmit(): void {
    console.log('form submitted');
  }
}
