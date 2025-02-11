import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [
    NgOptimizedImage,
    TranslatePipe
  ],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {

}
