import {Component, input} from '@angular/core';
import {IconComponent, IconName} from '../icon/icon.component';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  icon = input.required<IconName>();
  ariaLabel = input.required<string>();
  type = input<'button' | 'submit'>('button');
  pressed = input<boolean | undefined>(undefined);
}
