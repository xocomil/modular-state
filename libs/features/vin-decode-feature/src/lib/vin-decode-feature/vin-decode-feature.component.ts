import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mod-state-vin-decode-feature',
  standalone: true,
  imports: [CommonModule],
  template: `<p>vin-decode-feature works!</p>`,
  styleUrl: './vin-decode-feature.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VinDecodeFeatureComponent {}
