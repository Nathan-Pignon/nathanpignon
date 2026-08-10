import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ContactFormComponent} from './contact-form.component';
import {environmentProd} from '../../../environments/environment.prod';

describe('ContactFormComponent', () => {
  let fixture: ComponentFixture<ContactFormComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, TranslateModule.forRoot()],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ContactFormComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should keep the submit button disabled while the form is invalid', () => {
    const submit: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submit.disabled).toBeTrue();
  });

  it('should send the contact request and show the success feedback', () => {
    const component = fixture.componentInstance;
    component.contactForm.setValue({name: 'Jane', email: 'jane@example.com', message: 'Hello'});
    fixture.detectChanges();

    const submit: HTMLButtonElement = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submit.disabled).toBeFalse();
    submit.click();
    fixture.detectChanges();

    const req = httpMock.expectOne(`${environmentProd.apiURL}/send-email`);
    expect(req.request.method).toBe('POST');
    req.flush('ok');
    fixture.detectChanges();

    expect(component.emailSent).toBeTrue();
    expect(fixture.nativeElement.querySelector('.validation-message')).toBeTruthy();
  });
});
