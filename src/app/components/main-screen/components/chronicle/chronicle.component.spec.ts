import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronicleComponent } from './chronicle.component';

describe('ChronicleComponent', () => {
  let component: ChronicleComponent;
  let fixture: ComponentFixture<ChronicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChronicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
