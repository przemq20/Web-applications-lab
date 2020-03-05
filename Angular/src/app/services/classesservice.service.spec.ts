import { TestBed } from '@angular/core/testing';

import { ClassesserviceService } from './classesservice.service';

describe('ClassesserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassesserviceService = TestBed.get(ClassesserviceService);
    expect(service).toBeTruthy();
  });
});
