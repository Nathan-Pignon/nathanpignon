import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateModule} from '@ngx-translate/core';
import {SkillsComponent} from './skills.component';

describe('SkillsComponent', () => {
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should group technologies by domain instead of showing progress bars or ratings', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#skills h2')).toBeTruthy();

    const groups = compiled.querySelectorAll('.skill-group');
    expect(groups.length).toBeGreaterThan(0);
    groups.forEach((group) => {
      expect(group.querySelector('h3')).toBeTruthy();
      expect(group.querySelectorAll('app-badge').length).toBeGreaterThan(0);
    });

    expect(compiled.querySelector('progress')).toBeNull();
    expect(compiled.querySelector('[role="progressbar"]')).toBeNull();
  });
});
