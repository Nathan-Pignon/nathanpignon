import {Component, input} from '@angular/core';

export type IconName = 'bars' | 'close' | 'download' | 'arrow-right' | 'arrow-up' | 'external-link' | 'send' | 'chevron-down' | 'layers' | 'pipeline' | 'shield' | 'layout';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  name = input.required<IconName>();
}
