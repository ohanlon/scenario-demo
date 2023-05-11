import { Component, Directive, OnInit } from "@angular/core";
import { ScenarioService } from "../../services/scenario.service";
import { field, view, scenario } from "../ScenarioItem";
import { FormGroup } from "@angular/forms";

// The base class for all form components that need to implement the scenario service.
// The preInit method must be called from the constructor of the derived class, so that the 
// formGroup, view, and visibility are registered before ngOnInit is run as these use the view
// and visibility, as well as the formGroup.
@Directive()
export abstract class ValidatingComponent implements OnInit {
    private formGroup: FormGroup | null = null;
    private view: view | null = null;
    protected scenario: scenario | null = null;
    constructor(private scenarioService: ScenarioService) { }

    protected preInit(formGroup: FormGroup, view: view, scenario: scenario): void {
        this.formGroup! = formGroup;
        this.view = view;
        this.scenario = scenario;
    }

    ngOnInit(): void {
        if (!this.formGroup || !this.view || !this.scenario) {
            throw new Error('preInit must be called from the constructor of the derived class');
        }
        this.scenarioService.setValidators(this.formGroup!, this.view!, this.scenario!);
    }

    onSubmit(): void {
        this.submitted = true;
        if (this.formGroup!.valid) {
            this.doSubmit();
            this.formGroup!.reset();
        } else {
            this.scenarioService.triggerValidation(this.formGroup!);
        }
    }

    submitted: boolean = false;

    get controls() { return this.formGroup!.controls; }

    errors(field: field, ...replacements: string[]): string {
        const errors = this.formGroup!.get(field)?.errors;
        if (!errors) return '';
        return this.scenarioService.getValidationMessage(this.view!, field, this.scenario!, errors, replacements);
    }

    isVisible(field: field): boolean {
        return this.scenarioService.showInForm(this.view!, this.scenario!, field);
    }

    // Handle the case where there are no validation failures.
    abstract doSubmit(): void;
}