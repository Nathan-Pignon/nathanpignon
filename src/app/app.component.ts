import {afterNextRender, Component, DestroyRef, ElementRef, inject, signal, viewChild} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {HeroComponent} from './components/hero/hero.component';
import {AboutComponent} from './components/about/about.component';
import {ContactFormComponent} from './components/contact-form/contact-form.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {HeaderComponent} from './components/header/header.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {ExperienceComponent} from './components/experience/experience.component';
import {SkillsComponent} from './components/skills/skills.component';
import {FooterComponent} from './components/footer/footer.component';

const VIDEO_MIN_WIDTH = 900;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslatePipe,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    ExperienceComponent,
    SkillsComponent,
    ContactFormComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private destroyRef = inject(DestroyRef);
  private introVideoEl = viewChild<ElementRef<HTMLVideoElement>>('introVideo');

  protected videoEnabled = signal(false);

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');

    afterNextRender(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isDesktop = window.matchMedia(`(min-width: ${VIDEO_MIN_WIDTH}px)`).matches;
      if (reduceMotion || !isDesktop) {
        return;
      }
      this.videoEnabled.set(true);
      queueMicrotask(() => this.observeVisibility());
    });
  }

  private observeVisibility(): void {
    const video = this.introVideoEl()?.nativeElement;
    const band = video?.closest('.intro-band');
    if (!video || !band) {
      return;
    }

    video.muted = true;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          video.muted = true;
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      }
    }, {threshold: 0.05});

    observer.observe(band);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
