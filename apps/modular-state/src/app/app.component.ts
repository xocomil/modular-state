import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleDetailsComponent } from '@modular-state/vehicle.details';
import { VehicleInfoComponent } from '@modular-state/vehicle.info';

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
})
export class AppComponent {}
