import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockPage } from './lock.page';

describe('LockPage', () => {
  let component: LockPage;
  let fixture: ComponentFixture<LockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
