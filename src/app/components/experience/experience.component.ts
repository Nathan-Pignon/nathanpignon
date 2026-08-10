import {Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {NgForOf, NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {ExperienceService} from '../../services/experience.service';
import {SectionComponent} from '../section/section.component';
import {BadgeComponent} from '../badge/badge.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgForOf, NgIf, TranslatePipe, SectionComponent, BadgeComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  private experienceService = inject(ExperienceService);

  protected experience = toSignal(this.experienceService.experience$, {initialValue: []});
}
