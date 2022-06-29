import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionReactionComponent } from './action-reaction.component';

describe('ActionReactionComponent', () => {
  let component: ActionReactionComponent;
  let fixture: ComponentFixture<ActionReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionReactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
