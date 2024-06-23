import { Directive } from '@angular/core';

@Directive({
  selector: 'label[modStateCheckbox]',
  standalone: true,
  host: {
    class: 'label label-text cursor-pointer',
  },
})
export class CheckboxDirective {}
