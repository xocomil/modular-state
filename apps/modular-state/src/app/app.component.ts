import { Component, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  VehicleDetailsComponent,
  VehicleDetailsToken,
  withVehicleDetails,
} from '@modular-state/vehicle.details';
import { VehicleInfoComponent } from '@modular-state/vehicle.info';
import { signalStore } from '@ngrx/signals';

const VehicleStore = signalStore(withVehicleDetails());

function provideAppState(): Provider[] {
  return [
    VehicleStore,
    {
      provide: VehicleDetailsToken,
      useExisting: VehicleStore,
      deps: [VehicleStore],
    },
  ];
}

@Component({
  standalone: true,
  imports: [VehicleInfoComponent, FormsModule, VehicleDetailsComponent],
  selector: 'app-root',
  template: `
    <div class="container p-2">
      <form>
        <mod-state-vehicle-info />
        <mod-state-vehicle-details />
      </form>
    </div>
  `,
  styleUrl: './app.component.css',
  providers: [provideAppState()],
})
export class AppComponent {}
