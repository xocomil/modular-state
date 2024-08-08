import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VinDecoderComponent } from './vin-decoder.component';

describe('VinDecoderComponent', () => {
  let component: VinDecoderComponent;
  let fixture: ComponentFixture<VinDecoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VinDecoderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VinDecoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
