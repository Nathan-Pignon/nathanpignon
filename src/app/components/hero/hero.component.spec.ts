import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {HeroComponent} from './hero.component';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the name as the single page heading', () => {
    const heading = fixture.nativeElement.querySelector('h1');
    expect(heading?.textContent).toContain('Nathan Pignon');
  });

  it('should link the primary CTA to the projects section', () => {
    const ctas: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a.btn');
    const projectsCta = Array.from(ctas).find(a => a.getAttribute('href') === '#projects');
    expect(projectsCta).toBeTruthy();
  });

  it('should expose a CV download link', () => {
    const ctas: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a.btn');
    const cvLink = Array.from(ctas).find(a => a.getAttribute('href')?.endsWith('.pdf'));
    expect(cvLink).toBeTruthy();
    expect(cvLink?.hasAttribute('download')).toBeTrue();
  });
});
