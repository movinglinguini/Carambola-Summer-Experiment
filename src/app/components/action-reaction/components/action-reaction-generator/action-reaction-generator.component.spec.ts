import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionReactionGeneratorComponent } from './action-reaction-generator.component';

describe('ActionReactionGeneratorComponent', () => {
  let component: ActionReactionGeneratorComponent;
  let fixture: ComponentFixture<ActionReactionGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionReactionGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionReactionGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
