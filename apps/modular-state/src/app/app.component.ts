import { Component } from '@angular/core';
import { VehicleInfoComponent } from '@modular-state/vehicle.info';

@Component({
  standalone: true,
  imports: [VehicleInfoComponent],
  selector: 'app-root',
  template: `
    <div class="container">
      <mod-state-vehicle-info />
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {}
