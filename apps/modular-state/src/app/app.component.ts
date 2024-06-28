import { JsonPipe } from '@angular/common';
import { Component, computed, inject, Provider } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
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
  imports: [JsonPipe, RouterLink, RouterOutlet],
  selector: 'app-root',
  template: `
    <div class="left-nav">
      <a routerLink="/">Home</a>
      <a routerLink="/wizard">Wizard</a>
    </div>
    <div class="vehicle-description">
      <h1 class="text-primary">{{ store.vehicleDescription() }}</h1>
    </div>
    <div class="details">
      <pre class="mockup-code">{{ allVehicleProps() | json }}</pre>
    </div>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  host: {
    class: 'p-4 h-full prose w-full max-w-full',
  },
  styleUrl: './app.component.css',
  providers: [provideAppState()],
})
export class AppComponent {
  protected readonly store = inject(VehicleStore);
  protected readonly allVehicleProps = computed(() => getState(this.store));
}
