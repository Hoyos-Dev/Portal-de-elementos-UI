import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesUiComponent } from './categories-ui.component';

describe('CategoriesUiComponent', () => {
  let component: CategoriesUiComponent;
  let fixture: ComponentFixture<CategoriesUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesUiComponent]
    });
    fixture = TestBed.createComponent(CategoriesUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
