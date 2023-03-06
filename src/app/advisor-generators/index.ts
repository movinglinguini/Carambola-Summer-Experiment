import { IAdvisor } from "../interfaces/advisor.interface";
import { generateAdvisors as defaultGenerator } from "./default-generator.function";

export const advisorGenerators = new Map<string, ((opts?:any) => IAdvisor[])>([
  ['defaultGenerator', defaultGenerator]
]);
