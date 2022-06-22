import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffinityTablesComponent } from './affinity-tables.component';

describe('AffinityTablesComponent', () => {
  let component: AffinityTablesComponent;
  let fixture: ComponentFixture<AffinityTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffinityTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffinityTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
