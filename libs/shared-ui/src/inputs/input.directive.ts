import { Directive } from '@angular/core';

@Directive({
  selector: 'label[modStateInput]',
  standalone: true,
  host: {
    class: 'input input-bordered flex items-center gap-2',
  },
})
export class InputDirective {}
