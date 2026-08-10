import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {ExperienceModel} from '../models/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private experienceUpdated: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  experience$ = this.experienceUpdated.asObservable().pipe(map(() => this.getAllExperience()));

  private translationSubscription!: Subscription;

  constructor(private translate: TranslateService) {
    this.translationSubscription = this.translate
      .stream('jobTitle')
      .subscribe(() => {
        this.experienceUpdated.next();
      });
  }

  public getAllExperience(): ExperienceModel[] {
    return [
      {
        company: 'Groupe Millet',
        role: this.translate.instant('experience.millet.role'),
        duration: this.translate.instant('experience.millet.duration'),
        summary: this.translate.instant('experience.millet.summary'),
        tags: ['Windev', 'Windev Mobile', 'Android', 'Arduino']
      },
      {
        company: 'Sopra Steria',
        role: this.translate.instant('experience.sopraSteria.role'),
        duration: this.translate.instant('experience.sopraSteria.duration'),
        summary: this.translate.instant('experience.sopraSteria.summary'),
        tags: ['Java', 'Spring Boot', 'Angular 15', 'PostgreSQL', 'Jenkins']
      },
      {
        company: 'AVENIR(s) ESR',
        role: this.translate.instant('experience.avenirsesr.role'),
        duration: this.translate.instant('experience.ongoing'),
        ongoing: true,
        summary: this.translate.instant('experience.avenirsesr.summary'),
        tags: ['Java 21', 'Spring Boot 3', 'Vue 3', 'PostgreSQL', 'OIDC', 'GitHub Actions']
      }
    ];
  }
}
