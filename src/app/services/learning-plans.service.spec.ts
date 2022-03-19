import { TestBed } from '@angular/core/testing';

import { LearningPlansService } from './learning-plans.service';

describe('LearningPlansService', () => {
  let service: LearningPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
