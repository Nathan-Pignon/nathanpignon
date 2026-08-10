import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {SectionComponent} from '../section/section.component';
import {IconComponent} from '../icon/icon.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatePipe, SectionComponent, IconComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
}
