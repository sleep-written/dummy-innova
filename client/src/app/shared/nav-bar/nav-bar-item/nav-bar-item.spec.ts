import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarItem } from './nav-bar-item';

describe('NavBarItem', () => {
  let component: NavBarItem;
  let fixture: ComponentFixture<NavBarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
