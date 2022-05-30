import { ValueAttitudeKeys } from './../shared/values.utility';
import { TestBed } from '@angular/core/testing';
import { generateAdvisors, IAdvisor } from './generate-advisors';

describe('AppComponent', () => {
  const ADVISOR_COUNT  = 3;
  let advisorList: IAdvisor[] = [];
  beforeEach(async () => {
    advisorList = generateAdvisors(ADVISOR_COUNT);
  });

  it(`should generate ${ADVISOR_COUNT} advisors`, () => {
    expect(advisorList.length).toEqual(ADVISOR_COUNT);
  });

  describe('Advisors', () => {
    it('should have two cherished values per advisor', () => {
      const testCase = advisorList.every(advisor => advisor.cherishes.length === 2);
      expect(testCase).toBeTrue();
    });

    it('should have two despised values per advisor', () => {
      const testCase = advisorList.every(advisor => advisor.despises.length === 2);
      expect(testCase).toBeTrue();
    });

    it('should have no two advisors with the same cherished values', () => {
      const testCase = advisorList.every((advisor1, idx) => {
        const hasDistinctValues = advisorList.every((advisor2, jdx) => {
          if (idx === jdx) { return true; }
          return checkForDistinctValues(ValueAttitudeKeys.CHERISH, advisor1, advisor2);
        });

        return hasDistinctValues;
      });

      return expect(testCase).toBeTrue();
    });

    it('should have no two advisors with the same despised values', () => {
      const testCase = advisorList.every((advisor1, idx) => {
        const hasDistinctValues = advisorList.every((advisor2, jdx) => {
          if (idx === jdx) { return true; }
          return checkForDistinctValues(ValueAttitudeKeys.DESPISE, advisor1, advisor2);
        });

        return hasDistinctValues;
      });

      return expect(testCase).toBeTrue();
    });

    it('should have no advisor that cherishes and despises the same value', () => {
      const testCase = advisorList.every(advisor => {
        return advisor.cherishes.every(value => !advisor.despises.includes(value));
      });

      return expect(testCase).toBeTrue();
    });
  });
});



function checkForDistinctValues(key: ValueAttitudeKeys, advisor1: IAdvisor, advisor2: IAdvisor) {
  return advisor1[key].every(value => !advisor2[key].includes(value));
}
