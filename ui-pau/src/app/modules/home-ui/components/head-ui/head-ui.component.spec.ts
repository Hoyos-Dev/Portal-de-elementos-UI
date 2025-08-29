import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadUiComponent } from './head-ui.component';

describe('HeadUiComponent', () => {
  let component: HeadUiComponent;
  let fixture: ComponentFixture<HeadUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadUiComponent]
    });
    fixture = TestBed.createComponent(HeadUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
