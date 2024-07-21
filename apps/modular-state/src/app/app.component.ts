import { JsonPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { getState } from '@ngrx/signals';
import { provideAppState, VehicleStore } from './state/store';

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
