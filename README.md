# ScenarioDemo

This sample code shows how we can separate validation and validation management from a form. The vast majority of the capability
is handled automatically for you, but there are certain files that you will need to touch as you build out your code from this.

In the coreValidation folder, there are three files that you will update to match the validation, views, and scenarios that you want to
cater for in the development. These files are:

1. ScenarioItem.ts. This contains the type definitions used throughout the project. To demonstrate controlling which fields are displayed, we have the `scenario` type, which helps determine the validation to be applied, and what is visible on the screen. Each component has a unique `view` name, again limiting the validation that applies to the particular view. The `field` entry maps to the fields that appear in the different form groups. `validationName` is the unique name that we want to give a validation item, and the `friendlyName` is the validator function name.
1. ValidationRegistration.ts. This contains the registration of the different validators.
1. ScenarioRegistration.ts. Each view has validation and scenarios that need to be applied. These are registered in this file.

With these files updated, you can create a form that extends ValidatingComponent.ts. There are three things you need to do in your form, at a minimum. The first thing is you need to create a FormGroup. If there are fields that need to be validated in FormGroup, a matching entry will be present in ScenarioRegistration.ts as mentioned above.

The next thing you need to do is create a constructor that accepts the ScenarioService. The constructor will look something like this.
```typescript
constructor(scenarioService: ScenarioService) { 
  super(scenarioService);
  this.preInit(this.sampleForm, 'app-sample-user', 'lloyds');
}
```
The preInit call accepts the form group, view, and visibility entry. In this example, we have added a formgroup called sampleForm, which exists in the app-sample-user view, and the scenario is 'lloyds'.

Finally, you need to implement the `doSubmit` method which is called when the user submits the form.

In the HTML form, to display the validation failures, use the field name (in the sample, I'm using `firstName`). Where a validation entry supports placeholders, this can be provided as additional parameters in the `errors` method (here I'm replacing `{}` with First name)
```html
<div *ngIf="controls['firstName'].errors" class="invalid-feedback">
    <div>{{errors('firstName', 'First name')}}</div>
</div>
```
To get a better idea of the application capabilities, please read the code and pay particular attention to the sample-user component and coreValidation root folders.