import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mod-state-vin-decoder-button',
  standalone: true,
  imports: [CommonModule],
  template: `<p>vin-decoder-button works!</p>`,
  styleUrl: './vin-decoder-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VinDecoderButtonComponent {}
