import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputDirective } from '@modular-state/shared-ui';
import { VehicleInfoStore } from './state/vehicle-info.store';

@Component({
  selector: 'mod-state-vehicle-info',
  standalone: true,
  imports: [CommonModule, InputDirective, FormsModule],
  template: `
    <label modStateInput>
      VIN
      <input type="text" placeholder="VIN" [ngModel]="store.vin()" />
    </label>
    <label modStateInput>
      Year
      <input type="text" placeholder="Vehicle Year" [ngModel]="store.year()" />
    </label>
    <label modStateInput>
      Make
      <input type="text" placeholder="Vehicle Make" [ngModel]="store.make()" />
    </label>
    <label modStateInput>
      Model
      <input
        type="text"
        placeholder="Vehicle Model"
        [ngModel]="store.model()"
      />
    </label>
    <label modStateInput>
      Trim
      <input type="text" placeholder="Trim Level" [ngModel]="store.trim()" />
    </label>
    <label modStateInput>
      Stock Number
      <input
        type="text"
        placeholder="Stock Number"
        [ngModel]="store.stockNumber()"
      />
    </label>
  `,
  styleUrl: './vehicle-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col gap-4',
  },
  providers: [VehicleInfoStore],
})
export class VehicleInfoComponent {
  protected readonly store = inject(VehicleInfoStore);
}
