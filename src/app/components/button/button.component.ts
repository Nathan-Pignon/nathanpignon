import {Component, input} from '@angular/core';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {IconComponent} from '../icon/icon.component';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'sm';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  type = input<'button' | 'submit'>('button');
  href = input<string | undefined>(undefined);
  target = input<string | undefined>(undefined);
  download = input(false);
  disabled = input(false);
  loading = input(false);
  ariaLabel = input<string | undefined>(undefined);
}
