import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CardComponent} from '../card/card.component';
import {ProjectTypeModel} from '../../models/project-type.model';
import {ProjectTypeEnum} from '../../enums/project-type.enum';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {ProjectsService} from '../../services/projects.service';

@Component({
  selector: 'app-projects-menu',
  standalone: true,
  imports: [
    NgForOf,
    CardComponent
  ],
  templateUrl: './projects-menu.component.html',
  styleUrl: './projects-menu.component.scss',
})
export class ProjectsMenuComponent implements OnInit {
  protected projectTypes: ProjectTypeModel[] = [];
  protected selectedProjectType: ProjectTypeEnum = ProjectTypeEnum.PERSONAL;
  private translationSubscription!: Subscription;

  constructor(private translate: TranslateService,
              private projectsService: ProjectsService) {
  }

  ngOnInit() {
    this.translationSubscription = this.translate
      .stream('projects.personal.title')
      .subscribe((translation: string) => {
        this.onTranslationUpdate();
      });
  }

  protected onTranslationUpdate(): void {
    this.projectTypes = [
      {name: this.translate.instant('projects.personal.title'), type: ProjectTypeEnum.PERSONAL},
      {name: this.translate.instant('projects.school.title'), type: ProjectTypeEnum.SCHOOL},
      {name: this.translate.instant('projects.professional.title'), type: ProjectTypeEnum.PROFESSIONAL}
    ];
  }

  protected projectTypeIsSelected(projectType: ProjectTypeEnum): string {
    return this.selectedProjectType === projectType ? 'project-menu-selected' : '';
  }

  protected selectProjectType(projectType: ProjectTypeEnum): void {
    this.projectsService.changeProjectType(projectType);
    this.selectedProjectType = projectType;
  }

  protected previousProjectType(): void {
    const currentIndex = this.projectTypes.findIndex(pt => pt.type === this.selectedProjectType);
    const newIndex = (currentIndex - 1 + this.projectTypes.length) % this.projectTypes.length;
    const newType = this.projectTypes[newIndex].type;
    this.selectProjectType(newType);
  }

  protected nextProjectType(): void {
    const currentIndex = this.projectTypes.findIndex(pt => pt.type === this.selectedProjectType);
    const newIndex = (currentIndex + 1) % this.projectTypes.length;
    const newType = this.projectTypes[newIndex].type;
    this.selectProjectType(newType);
  }

  protected projectIsHidden(projectType: ProjectTypeEnum): boolean {
    return this.selectedProjectType !== projectType;
  }

}
