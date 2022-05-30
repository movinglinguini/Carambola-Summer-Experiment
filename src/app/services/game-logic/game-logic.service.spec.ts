import { environment } from './../../../environments/environment.prod';
import { IAdvisor } from 'src/app/functions/generate-advisors';
import { IAction } from 'src/app/functions/generate-actions';
import { IDecisionEvent } from './modules/generate-decision-event';
import { GameResources } from './resources/resources';
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

  describe('Initialization', () => {
    it('should populate the advisor and action lists on game start', () => {
      gameLogic.onStart();

      const advisorListIsPopulated = GameResources.advisorList.length > 0;
      const actionListIsPopulated = GameResources.actionList.length > 0;

      expect(advisorListIsPopulated && actionListIsPopulated).toBeTrue();
    });
  });

  describe('Event Handling', () => {

  });

  describe('Decision Events', () => {
    let decisionEvent: IDecisionEvent;
    beforeEach(() => {
      gameLogic.onStart();
      decisionEvent = gameLogic.generateDecisionEvent();
    });

    it('should create a decision event', () => {
      expect(decisionEvent).toBeTruthy();
    });

    it('should have two actions for each decision event', () => {
      expect(decisionEvent.alternatives.length === 2).toBeTrue();
    });

    it('should have each action be defined', () => {
      const actionsAreDefined = decisionEvent.alternatives.every(action => Boolean(action));
      expect(actionsAreDefined).toBeTrue();
    });

    it('should populate the decision event', () => {
      const chosenAction = decisionEvent.alternatives[0];
      gameLogic.onChooseAction(decisionEvent.alternatives[0]);
      expect(chosenAction).toBe(decisionEvent.alternatives[0]);
    });
  });

  describe('Action Effects', () => {
    let mockAction: IAction;

    beforeEach(() => {
      mockAction = {
        name: 'mock-action-1',
        promotes: [ 0, 1 ],
        harms: [ 2, 3 ],
        oppositeActionKey: 'mock-action-2'
      };

      gameLogic.onStart();
      gameLogic.generateDecisionEvent();

      GameResources.advisorList = [];
    });

    it('should make affinity towards player 1', () => {
      const mockAdvisor: IAdvisor = {
        name: 'mock-advisor',
        cherishes: [ 0, -1 ],
        despises: [ -1, -1 ],
        affinityMap: new Map([[environment.playerCharacterKey, { name: environment.playerCharacterKey, affinity: 0 }]]),
      };

      GameResources.advisorList.push(mockAdvisor);

      gameLogic.onChooseAction(mockAction);

      const playerAffinity = mockAdvisor.affinityMap.get(environment.playerCharacterKey);

      expect(playerAffinity?.affinity).toEqual(1);
    });

    it('should make affinity towards player -1', () => {
      const mockAdvisor: IAdvisor = {
        name: 'mock-advisor',
        cherishes: [ -1, -1 ],
        despises: [ 0, -1 ],
        affinityMap: new Map([[environment.playerCharacterKey, { name: environment.playerCharacterKey, affinity: 0 }]]),
      };

      GameResources.advisorList.push(mockAdvisor);

      gameLogic.onChooseAction(mockAction);

      const playerAffinity = mockAdvisor.affinityMap.get(environment.playerCharacterKey);

      expect(playerAffinity?.affinity).toEqual(-1);
    });

    it('should make affinity towards player 2', () => {
      const mockAdvisor: IAdvisor = {
        name: 'mock-advisor',
        cherishes: [ 0, 1 ],
        despises: [ -1, -1 ],
        affinityMap: new Map([[environment.playerCharacterKey, { name: environment.playerCharacterKey, affinity: 0 }]]),
      };

      GameResources.advisorList.push(mockAdvisor);

      gameLogic.onChooseAction(mockAction);

      const playerAffinity = mockAdvisor.affinityMap.get(environment.playerCharacterKey);

      expect(playerAffinity?.affinity).toEqual(2);
    });

    it('should make affinity towards player -2', () => {
      const mockAdvisor: IAdvisor = {
        name: 'mock-advisor',
        cherishes: [ -1, -1 ],
        despises: [ 0, 1 ],
        affinityMap: new Map([[environment.playerCharacterKey, { name: environment.playerCharacterKey, affinity: 0 }]]),
      };

      GameResources.advisorList.push(mockAdvisor);

      gameLogic.onChooseAction(mockAction);

      const playerAffinity = mockAdvisor.affinityMap.get(environment.playerCharacterKey);

      expect(playerAffinity?.affinity).toEqual(-2);
    });

    it('should make affinity towards player 1', () => {
      const mockAdvisor: IAdvisor = {
        name: 'mock-advisor',
        cherishes: [ 0, -1 ],
        despises: [ -1, -1 ],
        affinityMap: new Map([[environment.playerCharacterKey, { name: environment.playerCharacterKey, affinity: 0 }]]),
      };

      GameResources.advisorList.push(mockAdvisor);

      gameLogic.onChooseAction(mockAction);

      const playerAffinity = mockAdvisor.affinityMap.get(environment.playerCharacterKey);

      expect(playerAffinity?.affinity).toEqual(1);
    });

    it('should make affinity towards player 1', () => {
      const mockAdvisor: IAdvisor = {
        name: 'mock-advisor',
        cherishes: [ -1, -1 ],
        despises: [ 2, -1 ],
        affinityMap: new Map([[environment.playerCharacterKey, { name: environment.playerCharacterKey, affinity: 0 }]]),
      };

      GameResources.advisorList.push(mockAdvisor);

      gameLogic.onChooseAction(mockAction);

      const playerAffinity = mockAdvisor.affinityMap.get(environment.playerCharacterKey);

      expect(playerAffinity?.affinity).toEqual(1);
    });

    it('should make affinity towards player -1', () => {
      const mockAdvisor: IAdvisor = {
        name: 'mock-advisor',
        cherishes: [ 2, -1 ],
        despises: [ -1, -1 ],
        affinityMap: new Map([[environment.playerCharacterKey, { name: environment.playerCharacterKey, affinity: 0 }]]),
      };

      GameResources.advisorList.push(mockAdvisor);

      gameLogic.onChooseAction(mockAction);

      const playerAffinity = mockAdvisor.affinityMap.get(environment.playerCharacterKey);

      expect(playerAffinity?.affinity).toEqual(-1);
    });
  })
});
