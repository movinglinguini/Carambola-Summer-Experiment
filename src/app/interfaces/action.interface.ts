export interface IAction {
  name: string;
  description: string;
  promotes: number[];
  harms: number[];
  oppositeActionKey: string;
}
