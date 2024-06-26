import { JsonPipe } from '@angular/common';
import { Component, computed, inject, Provider } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  VehicleDetailsComponent,
  VehicleDetailsToken,
  withVehicleDetails,
} from '@modular-state/vehicle.details';
import {
  VehicleInfoComponent,
  VehicleInfoToken,
  withVehicleInfo,
} from '@modular-state/vehicle.info';
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
  imports: [
    FormsModule,
    JsonPipe,
    VehicleDetailsComponent,
    VehicleInfoComponent,
  ],
  selector: 'app-root',
  template: `
    <h1>{{ store.vehicleDescription() }}</h1>
    <div class="container p-2">
      <form>
        @defer {
          <mod-state-vehicle-info />
          <mod-state-vehicle-details />
        }
      </form>
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
