import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedActionComponent } from './selected-action.component';

describe('SelectedActionComponent', () => {
  let component: SelectedActionComponent;
  let fixture: ComponentFixture<SelectedActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
