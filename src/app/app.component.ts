import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TitleComponent} from './components/title/title.component';
import {ContactFormComponent} from './components/contact-form/contact-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TitleComponent, ContactFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
