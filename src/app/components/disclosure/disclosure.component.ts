import {Component, input, signal} from '@angular/core';
import {IconComponent} from '../icon/icon.component';

let nextId = 0;

@Component({
  selector: 'app-disclosure',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './disclosure.component.html',
  styleUrl: './disclosure.component.scss'
})
export class DisclosureComponent {
  label = input.required<string>();
  labelOpen = input.required<string>();

  protected open = signal(false);
  protected contentId = `disclosure-content-${nextId++}`;

  protected toggle(): void {
    this.open.update(value => !value);
  }
}
