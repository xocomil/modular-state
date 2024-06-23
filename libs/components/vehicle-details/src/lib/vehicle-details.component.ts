import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mod-state-vehicle-details',
  standalone: true,
  imports: [CommonModule],
  template: `<p>vehicle-details works!</p>`,
  styleUrl: './vehicle-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleDetailsComponent {}
