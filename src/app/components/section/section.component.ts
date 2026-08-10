import {Component, input} from '@angular/core';
import {ContainerComponent, ContainerSize} from '../container/container.component';

export type SectionBackground = 'base' | 'alt';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  sectionId = input<string>('');
  title = input<string>('');
  subtitle = input<string>('');
  containerSize = input<ContainerSize>('lg');
  background = input<SectionBackground>('base');
}
