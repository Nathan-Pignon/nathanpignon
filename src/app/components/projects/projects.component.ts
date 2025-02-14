import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProjectModel} from '../../models/project.model';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {ProjectsMenuComponent} from '../projects-menu/projects-menu.component';
import {ProjectsService} from '../../services/projects.service';
import {CardComponent} from '../card/card.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    NgIf,
    ProjectsMenuComponent,
    CardComponent,
    TranslatePipe
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  projects: ProjectModel[] = [];

  constructor(private projectsService: ProjectsService,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.projectsService.currentProjectType$.subscribe((projectType) => {
      this.projects = this.projectsService.getProjectsByType(projectType);
      this.changeDetectorRef.detectChanges();
    });
  }

  protected isNormalClassOrReverseClass(index: number): string {
    return index % 2 === 0 ? 'project-card-container' : 'project-card-container-reverse';
  }

  protected isNormalCardOrReverseCard(index: number): string {
    return index % 2 === 0 ? 'app-card-content' : 'app-card-content-reverse';
  }

  onProjectClick(project: ProjectModel) {
    console.log(project);
  }

}
