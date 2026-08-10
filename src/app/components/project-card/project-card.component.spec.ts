import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ProjectCardComponent} from './project-card.component';
import {ProjectModel} from '../../models/project.model';
import {ProjectTypeEnum} from '../../enums/project-type.enum';

describe('ProjectCardComponent', () => {
  let fixture: ComponentFixture<ProjectCardComponent>;

  const project: ProjectModel = {
    name: 'BoursIA',
    summary: 'Short teaser',
    description: 'Long description',
    tags: ['Flutter', 'Spring Boot'],
    image: 'assets/images/BoursIA-app-logo.png',
    imageWidth: 1024,
    imageHeight: 1024,
    type: ProjectTypeEnum.PERSONAL,
    featured: true,
    ios: 'https://apps.apple.com/us/app/boursia/id6741479554?platform=iphone',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    fixture.componentRef.setInput('project', project);
    fixture.componentRef.setInput('featured', true);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the name, the summary and a badge per tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('BoursIA');
    expect(compiled.textContent).toContain('Short teaser');

    const badges = Array.from(compiled.querySelectorAll('app-badge')).map(b => b.textContent?.trim());
    expect(badges).toContain('Flutter');
    expect(badges).toContain('Spring Boot');
  });

  it('should keep the long description collapsed behind a disclosure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-disclosure')).toBeTruthy();
    expect(compiled.textContent).toContain('Long description');
  });

  it('should link to the App Store when an iOS link is provided', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link: HTMLAnchorElement | null = compiled.querySelector('a.btn');
    expect(link?.getAttribute('href')).toBe(project.ios);
    expect(link?.getAttribute('target')).toBe('_blank');
  });
});
