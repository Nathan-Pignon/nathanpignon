import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CardComponent} from '../card/card.component';
import {ProjectTypeModel} from '../../models/project-type.model';
import {ProjectTypeEnum} from '../../enums/project-type.enum';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-projects-menu',
  standalone: true,
  imports: [
    NgForOf,
    CardComponent
  ],
  templateUrl: './projects-menu.component.html',
  styleUrl: './projects-menu.component.scss'
})
export class ProjectsMenuComponent {
  protected projectTypes: ProjectTypeModel[] = [];
  protected selectedProjectType: ProjectTypeEnum = ProjectTypeEnum.PERSONAL;
  private translationSubscription!: Subscription;

  constructor(private translate: TranslateService) {
    this.translationSubscription = this.translate
      .stream('projects.personal')
      .subscribe((translation: string) => {
        this.onTranslationUpdate();
      });
  }

  protected onTranslationUpdate(): void {
    this.projectTypes = [
      {name: this.translate.instant('projects.personal'), type: ProjectTypeEnum.PERSONAL},
      {name: this.translate.instant('projects.school'), type: ProjectTypeEnum.SCHOOL},
      {name: this.translate.instant('projects.professional'), type: ProjectTypeEnum.PROFESSIONAL}
    ];
  }

  protected projectTypeIsSelected(projectType: ProjectTypeEnum): string {
    return this.selectedProjectType === projectType ? 'project-menu-selected' : '';
  }

  protected selectProjectType(projectType: ProjectTypeEnum): void {
    this.selectedProjectType = projectType;
  }

}
