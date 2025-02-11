import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected currentLanguage: string = 'fr';

  constructor(private translate: TranslateService) {
  }

  protected switchLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'en' : 'fr';
    this.translate.use(this.currentLanguage);
  }

  protected getLanguageImagePath(): string {
    return this.currentLanguage === 'fr' ? 'assets/images/us.png' : 'assets/images/fr.png';
  }

}
