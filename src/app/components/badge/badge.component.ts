import {Component, input} from '@angular/core';

export type BadgeTone = 'neutral' | 'accent';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  tone = input<BadgeTone>('neutral');
  pulse = input(false);
}
