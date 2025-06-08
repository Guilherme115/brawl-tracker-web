import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniUserIngoProfile } from './mini-user-ingo-profile';

describe('MiniUserIngoProfile', () => {
  let component: MiniUserIngoProfile;
  let fixture: ComponentFixture<MiniUserIngoProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniUserIngoProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniUserIngoProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
