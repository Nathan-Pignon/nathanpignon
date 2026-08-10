import {Component, input} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {ProjectModel} from '../../models/project.model';
import {CardComponent} from '../card/card.component';
import {BadgeComponent} from '../badge/badge.component';
import {ButtonComponent} from '../button/button.component';
import {IconComponent} from '../icon/icon.component';
import {DisclosureComponent} from '../disclosure/disclosure.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgOptimizedImage,
    TranslatePipe,
    CardComponent,
    BadgeComponent,
    ButtonComponent,
    IconComponent,
    DisclosureComponent
  ],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  project = input.required<ProjectModel>();
  featured = input(false);
}
