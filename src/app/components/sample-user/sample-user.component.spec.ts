import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleUserComponent } from './sample-user.component';

describe('SampleUserComponent', () => {
  let component: SampleUserComponent;
  let fixture: ComponentFixture<SampleUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should have a form with 2 fields', () => {
  //   expect(component.sampleForm).toBeTruthy();
  //   expect(component.sampleForm.controls['field1']).toBeTruthy();
  //   expect(component.sampleForm.controls['field2']).toBeTruthy();
  // });

  
});
