import {afterNextRender, Component, DestroyRef, ElementRef, inject, signal, viewChild} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {DOCUMENT} from '@angular/common';
import {ContainerComponent} from '../container/container.component';
import {ButtonComponent} from '../button/button.component';
import {IconButtonComponent} from '../icon-button/icon-button.component';

type Lang = 'fr' | 'en';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TranslatePipe,
    ContainerComponent,
    ButtonComponent,
    IconButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private document = inject(DOCUMENT);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);

  private drawer = viewChild<ElementRef<HTMLElement>>('drawer');
  private menuToggle = viewChild('menuToggle', {read: ElementRef<HTMLElement>});

  protected scrolled = signal(false);
  protected menuOpen = signal(false);
  protected currentLanguage = signal<Lang>('fr');

  constructor() {
    afterNextRender(() => {
      const onScroll = () => {
        // Stay transparent/light-text for as long as the video band
        // (Hero + Profil) is still behind the header; 64 matches
        // --header-height.
        const introBand = this.document.querySelector('.intro-band');
        const threshold = introBand ? introBand.getBoundingClientRect().bottom : 8;
        this.scrolled.set(threshold <= 64);
      };
      const onResize = () => {
        onScroll();
        if (window.innerWidth > 768 && this.menuOpen()) {
          this.closeMenu();
        }
      };
      onScroll();
      window.addEventListener('scroll', onScroll, {passive: true});
      window.addEventListener('resize', onResize);
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      });
    });
  }

  protected switchLanguage(): void {
    const next: Lang = this.currentLanguage() === 'fr' ? 'en' : 'fr';
    this.currentLanguage.set(next);
    this.translate.use(next);
    this.document.documentElement.lang = next;
  }

  protected toggleMenu(): void {
    this.menuOpen() ? this.closeMenu() : this.openMenu();
  }

  protected openMenu(): void {
    this.menuOpen.set(true);
    this.document.body.style.overflow = 'hidden';
    queueMicrotask(() => {
      const firstLink = this.drawer()?.nativeElement.querySelector<HTMLElement>('a, button');
      firstLink?.focus();
    });
  }

  protected closeMenu(): void {
    if (!this.menuOpen()) {
      return;
    }
    this.menuOpen.set(false);
    this.document.body.style.overflow = '';
    this.menuToggle()?.nativeElement.focus();
  }

  protected onDrawerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
      return;
    }
    if (event.key !== 'Tab') {
      return;
    }
    const focusable = this.drawer()?.nativeElement.querySelectorAll<HTMLElement>('a, button');
    if (!focusable || focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  protected navigate(event: Event, elementId: string): void {
    event.preventDefault();
    const element = this.document.getElementById(elementId);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element?.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth'});
    this.closeMenu();
  }
}
