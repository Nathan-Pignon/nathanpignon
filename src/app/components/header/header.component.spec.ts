import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HeaderComponent} from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, TranslateModule.forRoot()],
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    translate.setDefaultLang('fr');
    translate.use('fr');

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show the brand link back to the hero and the main navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brand = compiled.querySelector<HTMLAnchorElement>('.brand');
    expect(brand?.textContent).toContain('Nathan Pignon');
    expect(brand?.getAttribute('href')).toBe('#hero');

    const hrefs = Array.from(compiled.querySelectorAll('.nav-link')).map(a => a.getAttribute('href'));
    expect(hrefs).toContain('#about');
    expect(hrefs).toContain('#projects');
  });

  it('should switch the active language when the language toggle is clicked', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toggle: HTMLButtonElement | null = compiled.querySelector('.lang-toggle');
    expect(translate.currentLang).toBe('fr');

    toggle?.click();
    fixture.detectChanges();

    expect(translate.currentLang).toBe('en');
  });

  it('should open and close the mobile drawer from the menu toggle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mobile-drawer')).toBeNull();

    const menuToggle: HTMLButtonElement | null = compiled.querySelector('.menu-toggle button');
    menuToggle?.click();
    fixture.detectChanges();

    const drawer = compiled.querySelector('.mobile-drawer');
    expect(drawer).toBeTruthy();
    expect(menuToggle?.getAttribute('aria-pressed')).toBe('true');

    drawer?.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true}));
    fixture.detectChanges();

    expect(compiled.querySelector('.mobile-drawer')).toBeNull();
  });
});
