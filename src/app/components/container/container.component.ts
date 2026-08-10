import {Component, input} from '@angular/core';

export type ContainerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {
  size = input<ContainerSize>('lg');
}
