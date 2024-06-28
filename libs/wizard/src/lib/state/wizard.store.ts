import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

type WizardSteps = 'info' | 'details' | 'confirmation';
type WizardState = {
  currentStep: WizardSteps;
};

const initialState = (): WizardState => ({
  currentStep: 'info',
});

export const WizardStore = signalStore(
  withState(initialState()),
  withComputed((store) => ({
    displayBackButton: computed(() => store.currentStep() !== 'info'),
    displayNextButton: computed(() => store.currentStep() !== 'confirmation'),
  })),
  withMethods((store) => ({
    nextStep() {
      patchState(store, { currentStep: getNextState(store.currentStep()) });
    },
    previousStep() {
      patchState(store, { currentStep: getPreviousState(store.currentStep()) });
    },
  })),
);

function getNextState(currentStep: WizardSteps): WizardSteps {
  switch (currentStep) {
    case 'info':
      return 'details';
    case 'details':
      return 'confirmation';
    default:
      return 'info';
  }
}

function getPreviousState(currentStep: WizardSteps): WizardSteps {
  switch (currentStep) {
    case 'confirmation':
      return 'details';
    case 'details':
      return 'info';
    default:
      return 'info';
  }
}
