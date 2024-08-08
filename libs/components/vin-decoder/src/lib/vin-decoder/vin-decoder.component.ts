import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mod-state-vin-decoder',
  standalone: true,
  imports: [CommonModule],
  template: `<p>vin-decoder works!</p>`,
  styleUrl: './vin-decoder.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VinDecoderComponent {}
