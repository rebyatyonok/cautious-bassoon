import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPlansViewComponent } from './learning-plans-view.component';

describe('LearningPlansViewComponent', () => {
  let component: LearningPlansViewComponent;
  let fixture: ComponentFixture<LearningPlansViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningPlansViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPlansViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
