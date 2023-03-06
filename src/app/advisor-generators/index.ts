import { IAdvisor } from "../interfaces/advisor.interface";
import { generateAdvisors as defaultGenerator } from "./default-generator.function";
import { generateAdvisors as experimentalGeneratorControl } from './experimental-generator-control.function';
import { generateAdvisors as experimentalGeneratorExp } from "./experimental-generator-exp.function";

export const advisorGenerators = new Map<string, ((opts?:any) => IAdvisor[])>([
  ['defaultGenerator', defaultGenerator],
  ['experimentalGeneratorControl', experimentalGeneratorControl],
  ['experimentalGeneratorExp', experimentalGeneratorExp]
]);
