import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VehicleInfoComponent } from '@modular-state/vehicle.info';

@Component({
  standalone: true,
  imports: [VehicleInfoComponent, FormsModule],
  selector: 'app-root',
  template: `
    <div class="container">
      <form>
        <mod-state-vehicle-info />
      </form>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {}
