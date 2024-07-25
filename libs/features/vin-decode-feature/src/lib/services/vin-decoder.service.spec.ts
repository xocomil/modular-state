import { TestBed } from '@angular/core/testing';

import { VinDecoderService } from './vin-decoder.service';

describe('VinDecoderService', () => {
  let service: VinDecoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinDecoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
