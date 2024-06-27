import { JsonPipe } from '@angular/common';
import { Component, computed, inject, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {
  VehicleDetailsToken,
  withVehicleDetails,
} from '@modular-state/vehicle.details';
import { VehicleInfoToken, withVehicleInfo } from '@modular-state/vehicle.info';
import {
  getState,
  signalStore,
  signalStoreFeature,
  withComputed,
} from '@ngrx/signals';

function withFullVehicle() {
  return signalStoreFeature(
    withVehicleInfo(),
    withVehicleDetails(),
    withComputed((store) => ({
      vehicleDescription: computed(
        () => `${store.year()} ${store.make()} ${store.model()}`,
      ),
    })),
  );
}

const VehicleStore = signalStore(withFullVehicle());

function provideAppState(): Provider[] {
  return [
    VehicleStore,
    {
      provide: VehicleDetailsToken,
      useExisting: VehicleStore,
      deps: [VehicleStore],
    },
    {
      provide: VehicleInfoToken,
      useExisting: VehicleStore,
      deps: [VehicleStore],
    },
  ];
}

@Component({
  standalone: true,
  imports: [FormsModule, JsonPipe, RouterOutlet],
  selector: 'app-root',
  template: `
    <h1>{{ store.vehicleDescription() }}</h1>
    <div class="container p-2">
      <router-outlet></router-outlet>
      <pre>{{ allVehicleProps() | json }}</pre>
    </div>
  `,
  styleUrl: './app.component.css',
  providers: [provideAppState()],
})
export class AppComponent {
  protected readonly store = inject(VehicleStore);
  protected readonly allVehicleProps = computed(() => getState(this.store));
}
