import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { naiveNone, naiveSome } from '@modular-state/naive-option';
import { InputDirective } from '@modular-state/shared-ui';
import { VinDecoderDirective } from '@modular-state/vin.decoder';
import { map } from 'rxjs';
import { VehicleInfoToken } from './state/vehicle-info.store.feature';

@Component({
  selector: 'mod-state-vehicle-info',
  standalone: true,
  imports: [InputDirective, FormsModule, VinDecoderDirective],
  template: `
    <form
      class="flex flex-col gap-4"
      #form="ngForm"
      [ngFormOptions]="{ updateOn: 'blur' }"
    >
      <div class="join w-full">
        <label class="grow" modStateInput>
          VIN (Last 6: {{ store.vinLast6() }})
          <input
            [ngModel]="store.vin()"
            [ngModelOptions]="{ updateOn: 'blur' }"
            type="text"
            placeholder="VIN"
            name="vin"
          />
        </label>
        <button modStateVinDecoder>Decode VIN</button>
      </div>
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
      this.store.update(
        this.form().valueChanges?.pipe(
          map((changes) =>
            changes == null ? naiveNone() : naiveSome(changes),
          ),
        ) ?? naiveNone(),
      );
    });
  }
}
