import { Component } from '@angular/core';
import { InputDirective } from '@modular-state/shared-ui';

@Component({
  standalone: true,
  imports: [InputDirective],
  selector: 'app-root',
  template: `
    <div class="container">
      <label modStateInput>
        Test Input
        <input type="text" placeholder="Enter something..." />
      </label>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {}
