import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mod-state-vehicle-info',
  standalone: true,
  imports: [CommonModule],
  template: `<p>vehicle-info works!</p>`,
  styleUrl: './vehicle-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleInfoComponent {}
