import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyLogin } from './already-login';

describe('AlreadyLogin', () => {
  let component: AlreadyLogin;
  let fixture: ComponentFixture<AlreadyLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlreadyLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlreadyLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
