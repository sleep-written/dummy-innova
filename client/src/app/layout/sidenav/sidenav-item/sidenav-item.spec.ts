import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SidenavItem } from './sidenav-item';

describe('SidenavItem', () => {
  let fixture: ComponentFixture<SidenavItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavItem],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavItem);
    fixture.componentRef.setInput('path', null);
    fixture.componentRef.setInput('icon', 'handyman');
    fixture.componentRef.setInput('text', 'Maintainers');
    fixture.componentRef.setInput('children', [
      { path: '/proc-materials', icon: 'package_2', text: 'Materials', children: [] },
    ]);
    await fixture.whenStable();
  });

  it('should expand and collapse its children', async () => {
    const el = fixture.nativeElement as HTMLElement;
    const button = el.querySelector('button')!;
    expect(el.querySelector('a[href="/proc-materials"]')).toBeNull();

    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('a[href="/proc-materials"]')).toBeTruthy();
  });
});
