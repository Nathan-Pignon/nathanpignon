import { Component } from '@angular/core';
import {ProjectModel} from '../../models/project.model';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {ProjectsMenuComponent} from '../projects-menu/projects-menu.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    NgIf,
    ProjectsMenuComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  projects: ProjectModel[] = [
  ];

  constructor() { }

  ngOnInit() {
  }

  onProjectClick(project: ProjectModel) {
    console.log(project);
  }

}
