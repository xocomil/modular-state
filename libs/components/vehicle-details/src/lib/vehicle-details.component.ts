import { CommonModule } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxDirective, InputDirective } from '@modular-state/shared-ui';
import { getState } from '@ngrx/signals';
import { VehicleDetailsStore } from './state/vehicle-details.store';

@Component({
  selector: 'mod-state-vehicle-details',
  standalone: true,
  imports: [CommonModule, FormsModule, InputDirective, CheckboxDirective],
  template: `<form
      class="flex flex-col gap-2"
      #form="ngForm"
      [ngFormOptions]="{ updateOn: 'blur' }"
    >
      <label modStateInput>
        Color
        <input
          [ngModel]="store.color()"
          type="text"
          name="color"
          placeholder="Vehicle Color"
        />
      </label>
      <label modStateInput>
        Engine
        <input
          [ngModel]="store.engine()"
          type="text"
          name="engine"
          placeholder="Engine"
        />
      </label>
      <label modStateInput>
        Fuel Type
        <input
          [ngModel]="store.fuelType()"
          type="text"
          name="fuelType"
          placeholder="Fuel Type"
        />
      </label>
      <label modStateCheckbox>
        Tinted Windows
        <input
          [ngModel]="store.tintedWindows()"
          type="checkbox"
          name="tintedWindows"
        />
      </label>
      <label modStateCheckbox>
        Sunroof
        <input
          [ngModel]="store.sunroof()"
          [ngModelOptions]="{ updateOn: 'change' }"
          type="checkbox"
          name="sunroof"
        />
      </label>
      <label modStateCheckbox>
        Heated Seats
        <input
          [ngModel]="store.heatedSeats()"
          [ngModelOptions]="{ updateOn: 'change' }"
          type="checkbox"
          name="heatedSeats"
        />
      </label>
      <label modStateCheckbox>
        Navigation
        <input
          [ngModel]="store.navigation()"
          [ngModelOptions]="{ updateOn: 'change' }"
          type="checkbox"
          name="navigation"
        />
      </label>
    </form>
    <pre>{{ log() | json }}</pre> `,
  styleUrl: './vehicle-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [VehicleDetailsStore],
})
export class VehicleDetailsComponent {
  protected store = inject(VehicleDetailsStore);
  protected log = computed(() => getState(this.store));
  protected form = viewChild.required<NgForm>('form');

  constructor() {
    afterNextRender(() => {
      this.store.update(this.form().valueChanges);
    });
  }
}
