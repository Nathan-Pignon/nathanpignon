import {Component, computed, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {TranslatePipe} from '@ngx-translate/core';
import {ProjectsService} from '../../services/projects.service';
import {SectionComponent} from '../section/section.component';
import {ProjectCardComponent} from '../project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    TranslatePipe,
    SectionComponent,
    ProjectCardComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);

  protected projects = toSignal(this.projectsService.projects$, {initialValue: []});
  protected featuredProjects = computed(() => this.projects().filter(project => project.featured));
  protected standardProjects = computed(() => this.projects().filter(project => !project.featured));
}
