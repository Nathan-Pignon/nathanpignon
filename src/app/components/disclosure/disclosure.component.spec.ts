import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Component} from '@angular/core';
import {DisclosureComponent} from './disclosure.component';

@Component({
  standalone: true,
  imports: [DisclosureComponent],
  template: `
    <app-disclosure label="Read more" labelOpen="Show less">
      <p>Hidden detail</p>
    </app-disclosure>
  `
})
class HostComponent {
}

describe('DisclosureComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should project the collapsed content and toggle it open on click', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Hidden detail');

    const trigger: HTMLButtonElement | null = compiled.querySelector('.disclosure-trigger');
    expect(trigger?.textContent).toContain('Read more');
    expect(trigger?.getAttribute('aria-expanded')).toBe('false');

    trigger?.click();
    fixture.detectChanges();

    expect(trigger?.textContent).toContain('Show less');
    expect(trigger?.getAttribute('aria-expanded')).toBe('true');
  });

  it('should link the trigger to the content via aria-controls', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const trigger = compiled.querySelector('.disclosure-trigger');
    const controls = trigger?.getAttribute('aria-controls');
    expect(controls).toBeTruthy();
    expect(compiled.querySelector(`#${controls}`)).toBeTruthy();
  });
});
