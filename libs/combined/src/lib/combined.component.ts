import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mod-state-combined',
  standalone: true,
  imports: [CommonModule],
  template: `<p>combined works!</p>`,
  styleUrl: './combined.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombinedComponent {}
