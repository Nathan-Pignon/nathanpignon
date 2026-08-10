import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {DOCUMENT} from '@angular/common';
import {ContainerComponent} from '../container/container.component';
import {ButtonComponent} from '../button/button.component';
import {IconComponent} from '../icon/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslatePipe,
    ContainerComponent,
    ButtonComponent,
    IconComponent
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  private document = inject(DOCUMENT);

  protected scrollToProjects(event: Event): void {
    event.preventDefault();
    const element = this.document.getElementById('projects');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element?.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth'});
  }
}
