import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPlanFormComponent } from './learning-plan-form.component';

describe('LearningPlanFormComponent', () => {
  let component: LearningPlanFormComponent;
  let fixture: ComponentFixture<LearningPlanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningPlanFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPlanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
