import {ProjectModel} from '../models/project.model';
import {ProjectTypeEnum} from '../enums/project-type.enum';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsUpdated: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  projects$ = this.projectsUpdated.asObservable().pipe(map(() => this.getAllProjects()));

  private translationSubscription!: Subscription;

  constructor(private translate: TranslateService) {
    this.translationSubscription = this.translate
      .stream('jobTitle')
      .subscribe(() => {
        this.projectsUpdated.next();
      });
  }

  public getAllProjects(): ProjectModel[] {
    return [
      ...this.getProfessionalProjects(),
      ...this.getPersonalProjects(),
      ...this.getSchoolProjects()
    ];
  }

  private getPersonalProjects(): ProjectModel[] {
    return [
      {
        name: this.translate.instant('projects.personal.boursia.title'),
        summary: this.translate.instant('projects.personal.boursia.summary'),
        description: this.translate.instant('projects.personal.boursia.description'),
        tags: ['Flutter', 'Spring Boot', 'Microservices', 'Spring Security', 'Docker', 'CI/CD'],
        image: 'assets/images/BoursIA-app-logo.png',
        imageWidth: 1024,
        imageHeight: 1024,
        type: ProjectTypeEnum.PERSONAL,
        featured: false,
        ios: 'https://apps.apple.com/us/app/boursia/id6741479554?platform=iphone',
      },
      {
        name: this.translate.instant('projects.personal.ujue.title'),
        summary: this.translate.instant('projects.personal.ujue.summary'),
        description: this.translate.instant('projects.personal.ujue.description'),
        tags: ['Flutter', 'BLoC', 'FastAPI', 'Python', 'SQLAlchemy'],
        image: 'assets/images/ujue_logo.png',
        imageWidth: 500,
        imageHeight: 500,
        type: ProjectTypeEnum.PERSONAL,
        featured: false,
        ios: 'https://apps.apple.com/us/app/ujue/id6741479554?platform=iphone',
      }
    ];
  }

  private getSchoolProjects(): ProjectModel[] {
    return [
      {
        name: this.translate.instant('projects.school.fettuccini.title'),
        summary: this.translate.instant('projects.school.fettuccini.summary'),
        description: this.translate.instant('projects.school.fettuccini.description'),
        tags: ['Java', 'Spring Boot', 'React', 'MongoDB', 'NFC'],
        image: 'assets/images/fettuccini.png',
        imageWidth: 2048,
        imageHeight: 1536,
        type: ProjectTypeEnum.SCHOOL,
        featured: false,
      }
    ];
  }

  private getProfessionalProjects(): ProjectModel[] {
    return [
      {
        name: this.translate.instant('projects.professional.avenirsesr.title'),
        summary: this.translate.instant('projects.professional.avenirsesr.summary'),
        description: this.translate.instant('projects.professional.avenirsesr.description'),
        tags: ['Java 21', 'Spring Boot 3', 'Vue 3', 'PostgreSQL', 'OIDC', 'GitHub Actions'],
        image: 'assets/images/Avenirs-esr-logo.png',
        imageWidth: 986,
        imageHeight: 838,
        type: ProjectTypeEnum.PROFESSIONAL,
        featured: true,
        github: 'https://github.com/avenirs-esr?view_as=public',
      },
      {
        name: this.translate.instant('projects.professional.sopraSteria.title'),
        summary: this.translate.instant('projects.professional.sopraSteria.summary'),
        description: this.translate.instant('projects.professional.sopraSteria.description'),
        tags: ['Java', 'Spring Boot', 'Angular 15', 'PostgreSQL', 'Jenkins'],
        image: 'assets/images/sopra-steria-logo.png',
        imageWidth: 225,
        imageHeight: 225,
        type: ProjectTypeEnum.PROFESSIONAL,
        featured: true,
      },
      {
        name: this.translate.instant('projects.professional.millet.title'),
        summary: this.translate.instant('projects.professional.millet.summary'),
        description: this.translate.instant('projects.professional.millet.description'),
        tags: ['Windev', 'Windev Mobile', 'Android', 'Arduino'],
        image: 'assets/images/millet-logo.png',
        imageWidth: 1080,
        imageHeight: 1080,
        type: ProjectTypeEnum.PROFESSIONAL,
        featured: false,
      }
    ];
  }
}
