import { Directive, inject, input } from '@angular/core';
import { VinDecoderFeature } from '@modular-state/vin.decode.feature';

@Directive({
  selector: 'button[modStateVinDecoder]',
  standalone: true,
  host: {
    '[class]': 'buttonStyles()',
    '(click)': 'decodeVin()',
  },
})
export class VinDecoderDirective {
  readonly buttonStyles = input('btn btn-primary');
  readonly #vinDecoder = inject(VinDecoderFeature);

  decodeVin() {
    this.#vinDecoder.decodeVin();
  }
}
