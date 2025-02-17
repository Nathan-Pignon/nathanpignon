import {ProjectModel} from '../models/project.model';
import {ProjectTypeEnum} from '../enums/project-type.enum';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private currentProjectType: BehaviorSubject<ProjectTypeEnum> = new BehaviorSubject<ProjectTypeEnum>(ProjectTypeEnum.PERSONAL);
  currentProjectType$ = this.currentProjectType.asObservable();

  private translationSubscription!: Subscription;

  constructor(private translate: TranslateService) {
    this.translationSubscription = this.translate
      .stream('jobTitle')
      .subscribe((translation: string) => {
        if (this.currentProjectType.value) {
          this.changeProjectType(this.currentProjectType.value);
        }
      });
  }

  public changeProjectType(projectType: ProjectTypeEnum): void {
    this.currentProjectType.next(projectType);
  }

  public getProjectsByType(projectType: ProjectTypeEnum): ProjectModel[] {
    switch (projectType) {
      case ProjectTypeEnum.PERSONAL:
        return this.getPersonalProjects();
      case ProjectTypeEnum.SCHOOL:
        return this.getSchoolProjects();
      case ProjectTypeEnum.PROFESSIONAL:
        return this.getProfessionalProjects();
      default:
        return [];
    }
  }

  public getPersonalProjects(): ProjectModel[] {
    return [
      {
        name: this.translate.instant('projects.personal.boursia.title'),
        description: this.translate.instant('projects.personal.boursia.description'),
        image: 'assets/images/BoursIA-app-logo.png',
        ios: 'https://apps.apple.com/us/app/boursia/id6741479554?platform=iphone',
      },
      {
        name: this.translate.instant('projects.personal.portfolio.title'),
        description: this.translate.instant('projects.personal.portfolio.description'),
        image: 'assets/images/portfolio.png',
        github: 'https://github.com/Nathan-Pignon/nathanpignon',
      }
    ];
  }

  public getSchoolProjects(): ProjectModel[] {
    return [
      {
        name: this.translate.instant('projects.school.fettuccini.title'),
        description: this.translate.instant('projects.school.fettuccini.description'),
        image: 'assets/images/fettuccini.png',
      },
      {
        name: this.translate.instant('projects.school.web800.title'),
        description: this.translate.instant('projects.school.web800.description'),
        image: 'assets/images/web800-logo.png',
        github: 'https://github.com/Nathan-Pignon/T-WEB-800',
      },
      {
        name: this.translate.instant('projects.school.dev700.title'),
        description: this.translate.instant('projects.school.dev700.description'),
        image: 'assets/images/dev700-logo.png',
        github: 'https://github.com/Nathan-Pignon/T-DEV-700',
      },
      {
        name: this.translate.instant('projects.school.dat901.title'),
        description: this.translate.instant('projects.school.dat901.description'),
        image: 'assets/images/dat901-logo.png',
        github: 'https://github.com/Nathan-Pignon/T-DAT-901',
      },
      {
        name: this.translate.instant('projects.school.dev810.title'),
        description: this.translate.instant('projects.school.dev810.description'),
        image: 'assets/images/dev810-logo.png',
        github: 'https://github.com/Nathan-Pignon/T-DEV-810',
      }
    ];
  }

  public getProfessionalProjects(): ProjectModel[] {
    return [
      {
        name: this.translate.instant('projects.professional.sopraSteria.title'),
        description: this.translate.instant('projects.professional.sopraSteria.description'),
        image: 'assets/images/sopra-steria-logo.png',
      },
      {
        name: this.translate.instant('projects.professional.millet.title'),
        description: this.translate.instant('projects.professional.millet.description'),
        image: 'assets/images/millet-logo.png',
      }
    ];
  }
}
