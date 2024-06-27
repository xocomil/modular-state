import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VehicleDetailsComponent } from '@modular-state/vehicle.details';
import { VehicleInfoComponent } from '@modular-state/vehicle.info';

@Component({
  selector: 'mod-state-combined',
  standalone: true,
  imports: [CommonModule, VehicleDetailsComponent, VehicleInfoComponent],
  template: `
    <form class="flex flex-col gap-4">
      @defer {
        <mod-state-vehicle-info />
        <mod-state-vehicle-details />
      }
    </form>
  `,
  styleUrl: './combined.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinedComponent {}
