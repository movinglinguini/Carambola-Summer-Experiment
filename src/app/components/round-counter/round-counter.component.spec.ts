import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundCounterComponent } from './round-counter.component';

describe('RoundCounterComponent', () => {
  let component: RoundCounterComponent;
  let fixture: ComponentFixture<RoundCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoundCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
