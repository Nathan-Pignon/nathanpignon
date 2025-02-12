import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TitleComponent} from './components/title/title.component';
import {ContactFormComponent} from './components/contact-form/contact-form.component';
import { TranslateService } from '@ngx-translate/core';
import {HeaderComponent} from './components/header/header.component';
import {ProjectsComponent} from './components/projects/projects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TitleComponent, ContactFormComponent, HeaderComponent, ProjectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected currentLanguage: string = 'fr';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }

  protected switchLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'fr' ? 'en' : 'fr';
    this.translate.use(this.currentLanguage);
  }
}
