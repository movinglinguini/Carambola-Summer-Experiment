import { IDecisionEvent } from './modules/generate-decision-event';
import { advisorList, actionList } from './resources/resources';
import { EngineService } from './../engine/engine.service';
import { TestBed } from '@angular/core/testing';
import { GameLogicService } from './game-logic.service';

describe('GameLogicService', () => {
  let gameLogic: GameLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: EngineService }
      ]
    });

    gameLogic = TestBed.inject(GameLogicService);
  });

  it('should be created', () => {
    expect(gameLogic).toBeTruthy();
  });

  describe('State Switching', () => {
    it('should populate the advisor and action lists on game start', () => {
      gameLogic.onStart();

      const advisorListIsPopulated = advisorList.length > 0;
      const actionListIsPopulated = actionList.length > 0;

      expect(advisorListIsPopulated && actionListIsPopulated).toBeTrue();
    });
  });

  describe('Event Handling', () => {});

  describe('Decision Events', () => {
    it('should create a decision event', () => {
      const decisionEvent: IDecisionEvent = gameLogic.generateDecisionEvent();
      expect(decisionEvent).toBeTruthy();
    });

    it('should populate the decision event', () => {
      let decisionEvent: IDecisionEvent = gameLogic.generateDecisionEvent();
      gameLogic.onChooseAction(decisionEvent.alternatives[0]);
      expect(gameLogic.currentDecisionEvent?.chosenAction).toBe(decisionEvent.alternatives[0]);
    });
  });
});
