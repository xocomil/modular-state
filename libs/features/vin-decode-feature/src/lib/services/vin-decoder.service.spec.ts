import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { VinDecoderService } from './vin-decoder.service';

describe('VinDecoderService', () => {
  let service: VinDecoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VinDecoderService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(VinDecoderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
