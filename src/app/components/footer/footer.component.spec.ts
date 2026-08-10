import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {FooterComponent} from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the name, the current year and links to GitHub and LinkedIn', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Nathan Pignon');
    expect(compiled.textContent).toContain(String(new Date().getFullYear()));

    const hrefs = Array.from(compiled.querySelectorAll('a')).map(a => a.getAttribute('href'));
    expect(hrefs).toContain('https://github.com/Nathan-Pignon');
    expect(hrefs).toContain('https://www.linkedin.com/in/nathan-pignon-b8b395199/');
  });
});
