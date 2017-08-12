import { TestBed, inject } from '@angular/core/testing';

import { AuthMicrosoftGraphService } from './auth-microsoft-graph.service';

describe('AuthMicrosoftGraphService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthMicrosoftGraphService]
    });
  });

  it('should be created', inject([AuthMicrosoftGraphService], (service: AuthMicrosoftGraphService) => {
    expect(service).toBeTruthy();
  }));
});
