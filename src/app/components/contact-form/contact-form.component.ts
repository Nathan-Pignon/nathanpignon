import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CardComponent} from "../card/card.component";
import {NgClass, NgIf, DOCUMENT} from "@angular/common";
import {ContactService} from "../../services/contact.service";
import {take} from "rxjs";
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  imports: [
    CardComponent,
    ReactiveFormsModule,
    NgIf,
    NgClass,
    TranslatePipe
  ],
  standalone: true,
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document,
              private contactService: ContactService) {}

  localStorage: Storage|undefined = undefined;

  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });
  emailSent: boolean = false;
  emailSentTime: string | null | undefined = undefined;

  isLoading: boolean = false;


  ngOnInit(): void {
    this.localStorage = this.document.defaultView?.localStorage;
    this.emailSent = this.localStorage?.getItem('emailSent') === 'true';
    this.emailSentTime = this.localStorage?.getItem('emailSentTime');
    if (this.emailSent && this.emailSentTime) {
      const currentTime = Date.now();
      const timeElapsed = currentTime - parseInt(this.emailSentTime);

      if (timeElapsed > 300000) {
        this.localStorage?.removeItem('emailSent');
        this.localStorage?.removeItem('emailSentTime');
        this.emailSent = false;
      }
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return control!.touched && control!.invalid;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isLoading = true;
      this.contactService.sendMail(this.contactForm.value).pipe(take(1)).subscribe(() => {
        this.localStorage?.setItem('emailSent', 'true');
        this.localStorage?.setItem('emailSentTime', Date.now().toString());
        this.isLoading = false;
        this.emailSent = true;
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
