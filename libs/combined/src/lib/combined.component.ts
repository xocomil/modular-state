import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleDetailsComponent } from '@modular-state/vehicle.details';
import { VehicleInfoComponent } from '@modular-state/vehicle.info';

@Component({
  selector: 'mod-state-combined',
  standalone: true,
  imports: [FormsModule, VehicleDetailsComponent, VehicleInfoComponent],
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
