import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffinityDescriptionGeneratorComponent } from './affinity-description-generator.component';

describe('AffinityDescriptionGeneratorComponent', () => {
  let component: AffinityDescriptionGeneratorComponent;
  let fixture: ComponentFixture<AffinityDescriptionGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffinityDescriptionGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffinityDescriptionGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
