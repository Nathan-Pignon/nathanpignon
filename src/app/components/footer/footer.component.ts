import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {ContainerComponent} from '../container/container.component';
import {IconComponent} from '../icon/icon.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe, ContainerComponent, IconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected year = new Date().getFullYear();

  protected scrollToTop(event: Event): void {
    event.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({top: 0, behavior: reduceMotion ? 'auto' : 'smooth'});
  }
}
