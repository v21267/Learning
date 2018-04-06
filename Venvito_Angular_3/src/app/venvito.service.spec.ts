import { TestBed, inject } from '@angular/core/testing';

import { VenvitoService } from './venvito.service';

describe('VenvitoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenvitoService]
    });
  });

  it('should be created', inject([VenvitoService], (service: VenvitoService) => {
    expect(service).toBeTruthy();
  }));
});
