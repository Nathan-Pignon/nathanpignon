import {Component, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {isPlatformBrowser, NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslatePipe,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  protected currentLanguage: string = 'fr';
  protected menuOpen: boolean = false;
  protected isMobileView: boolean = false;
  protected isBrowser: boolean = false;

  constructor(private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  @HostListener('window:resize', [])
  protected onResize(): void {
    if (this.isBrowser) {
      this.checkViewport();
    }
  }

  private checkViewport(): void {
    if (typeof window !== 'undefined') {
      this.isMobileView = window.innerWidth <= 768;
    }
  }

  protected switchLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'en' : 'fr';
    this.translate.use(this.currentLanguage);
  }

  protected toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  protected getLanguageImagePath(): string {
    return this.currentLanguage === 'fr' ? 'assets/images/us.png' : 'assets/images/fr.png';
  }

  protected scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
    if (this.isMobileView) {
      this.menuOpen = false;
    }
  }

}
