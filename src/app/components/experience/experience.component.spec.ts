import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ExperienceComponent} from './experience.component';
import {ExperienceService} from '../../services/experience.service';

describe('ExperienceComponent', () => {
  let fixture: ComponentFixture<ExperienceComponent>;
  let experienceService: ExperienceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    experienceService = TestBed.inject(ExperienceService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render one timeline entry per experience, in chronological order', () => {
    const expected = experienceService.getAllExperience();
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.timeline-item h3');

    expect(items.length).toBe(expected.length);
    items.forEach((item, index) => {
      expect(item.textContent).toContain(expected[index].company);
    });
  });

  it('should render a section heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#experience h2')).toBeTruthy();
  });
});
