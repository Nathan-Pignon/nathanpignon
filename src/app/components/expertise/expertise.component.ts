import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {SectionComponent} from '../section/section.component';
import {CardComponent} from '../card/card.component';
import {IconComponent, IconName} from '../icon/icon.component';

interface ExpertiseItem {
  icon: IconName;
  key: string;
}

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [NgForOf, TranslatePipe, SectionComponent, CardComponent, IconComponent],
  templateUrl: './expertise.component.html',
  styleUrl: './expertise.component.scss'
})
export class ExpertiseComponent {
  protected items: ExpertiseItem[] = [
    {icon: 'layers', key: 'architecture'},
    {icon: 'pipeline', key: 'cicd'},
    {icon: 'shield', key: 'security'},
    {icon: 'layout', key: 'frontend'}
  ];
}
