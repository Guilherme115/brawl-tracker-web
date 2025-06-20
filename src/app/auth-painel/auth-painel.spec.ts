import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPainel } from './auth-painel';

describe('AuthPainel', () => {
  let component: AuthPainel;
  let fixture: ComponentFixture<AuthPainel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPainel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPainel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
