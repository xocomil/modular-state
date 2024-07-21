import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InputDirective } from '@modular-state/shared-ui';
import { VehicleInfoToken } from './state/vehicle-info.store.feature';

@Component({
  selector: 'mod-state-vehicle-info',
  standalone: true,
  imports: [CommonModule, InputDirective, FormsModule],
  template: `
    <form
      class="flex flex-col gap-4"
      #form="ngForm"
      [ngFormOptions]="{ updateOn: 'blur' }"
    >
      <label modStateInput>
        VIN (Last 6: {{ store.vinLast6() }})
        <input
          [ngModel]="store.vin()"
          [ngModelOptions]="{ updateOn: 'blur' }"
          type="text"
          placeholder="VIN"
          name="vin"
        />
      </label>
      <label modStateInput>
        Year
        <input
          [ngModel]="store.year()"
          type="text"
          placeholder="Vehicle Year"
          name="year"
        />
      </label>
      <label modStateInput>
        Make
        <input
          [ngModel]="store.make()"
          type="text"
          placeholder="Vehicle Make"
          name="make"
        />
      </label>
      <label modStateInput>
        Model
        <input
          [ngModel]="store.model()"
          type="text"
          placeholder="Vehicle Model"
          name="model"
        />
      </label>
      <label modStateInput>
        Trim
        <input
          [ngModel]="store.trim()"
          type="text"
          placeholder="Trim Level"
          name="trim"
        />
      </label>
      <label modStateInput>
        Stock Number
        <input
          [ngModel]="store.stockNumber()"
          type="text"
          placeholder="Stock Number"
          name="stockNumber"
        />
      </label>
    </form>
  `,
  host: {
    class: 'bg-primary/15 p-2 block',
  },
  styleUrl: './vehicle-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleInfoComponent {
  protected readonly store = inject(VehicleInfoToken);
  protected readonly form = viewChild.required<NgForm>('form');

  constructor() {
    afterNextRender(() => {
      this.store.update(this.form().valueChanges);
    });
  }
}
