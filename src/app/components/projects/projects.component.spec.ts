import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ProjectsComponent} from './projects.component';
import {ProjectsService} from '../../services/projects.service';
import {ProjectTypeEnum} from '../../enums/project-type.enum';

describe('ProjectsComponent', () => {
  let fixture: ComponentFixture<ProjectsComponent>;
  let projectsService: ProjectsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    projectsService = TestBed.inject(ProjectsService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display every project from the service as a project card', () => {
    const expectedProjects = projectsService.getAllProjects();
    const cards = fixture.nativeElement.querySelectorAll('app-project-card');
    expect(cards.length).toBe(expectedProjects.length);
  });

  it('should include personal, school and professional projects together, without needing a category switch', () => {
    const expectedProjects = projectsService.getAllProjects();
    expect(expectedProjects.some(p => p.type === ProjectTypeEnum.PERSONAL)).toBeTrue();
    expect(expectedProjects.some(p => p.type === ProjectTypeEnum.SCHOOL)).toBeTrue();
    expect(expectedProjects.some(p => p.type === ProjectTypeEnum.PROFESSIONAL)).toBeTrue();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-projects-menu')).toBeNull();
    expect(compiled.querySelector('[role="tablist"]')).toBeNull();
  });

  it('should render at least one featured project ahead of the standard grid', () => {
    const expectedFeatured = projectsService.getAllProjects().filter(p => p.featured);
    expect(expectedFeatured.length).toBeGreaterThan(0);

    const featuredCards = fixture.nativeElement.querySelectorAll('.projects-featured app-project-card');
    expect(featuredCards.length).toBe(expectedFeatured.length);
  });

  it('should keep working links to each project resource', () => {
    const links: NodeListOf<HTMLAnchorElement> = fixture.nativeElement.querySelectorAll('a.btn');
    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => {
      expect(link.getAttribute('href')).toBeTruthy();
    });
  });

  it('should render a section heading, a type badge and technology tags for each project', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#projects h2')).toBeTruthy();

    const expectedProjects = projectsService.getAllProjects();
    const cards = compiled.querySelectorAll('app-project-card');
    expect(cards.length).toBe(expectedProjects.length);
    cards.forEach((card) => {
      expect(card.querySelectorAll('app-badge').length).toBeGreaterThan(0);
    });
  });

  it('should collapse the long description behind a disclosure toggle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const trigger: HTMLButtonElement | null = compiled.querySelector('app-disclosure .disclosure-trigger');
    expect(trigger).toBeTruthy();
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');

    trigger?.click();
    fixture.detectChanges();

    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
  });
});
