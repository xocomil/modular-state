import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { VehicleDetailsComponent } from '@modular-state/vehicle.details';
import { VehicleInfoComponent } from '@modular-state/vehicle.info';
import { VehicleInfoToken } from '@modular-state/vehicle.info.state';
import { getState } from '@ngrx/signals';
import { WizardStore } from './state/wizard.store';

@Component({
  selector: 'mod-state-wizard',
  standalone: true,
  imports: [JsonPipe, VehicleDetailsComponent, VehicleInfoComponent],
  template: `<div>
      @switch (store.currentStep()) {
        @case ('info') {
          @defer {
            <mod-state-vehicle-info />
          }
        }
        @case ('details') {
          <div>
            @defer {
              <mod-state-vehicle-details />
            }
          </div>
        }
        @case ('confirmation') {
          <div>
            <h1>Confirmation</h1>
            <pre>{{ getState(vehicleStore) | json }}</pre>
          </div>
        }
      }
    </div>
    <div class="flex gap-2 place-items-center flex-row-reverse">
      @if (store.displayNextButton()) {
        <button class="btn btn-primary" (click)="next()" type="button">
          Next
        </button>
      }
      @if (store.displayBackButton()) {
        <button class="btn btn-accent" (click)="back()" type="button">
          Back
        </button>
      }
    </div>`,
  styleUrl: './wizard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'grid h-full w-full',
  },
  providers: [WizardStore],
})
export class WizardComponent {
  protected readonly store = inject(WizardStore);
  protected readonly vehicleStore = inject(VehicleInfoToken);
  protected readonly getState = getState;

  protected next() {
    this.store.nextStep();
  }

  protected back() {
    this.store.previousStep();
  }
}
